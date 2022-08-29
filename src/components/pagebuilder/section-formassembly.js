/**
 * Display FormAssembly form via API
 *
 * reference: https://help.formassembly.com/help/340359-publish-with-an-iframe
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../layout/container';
import Section from '../sections/section';

const SectionFormAssembly = ({ section: { _key, formID } }, isPageContent, noPaddingTop) => {
  const [formHTML, setFormHTML] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const url = `http://localhost:3000/api/formassembly`;
    const url = `/api/formassembly`;

    /* using fetch */
    // fetch(url)
    //   .then((response) => {
    //     console.log(`*** SVU: response:`, response);
    //     return response.text();
    //   })
    //   .then((html) => {
    //     setFormHTML(html);
    //   })
    //   .catch((error) => {
    //     console.log(`ERROR: error thrown trying to get FormAssembly content`, error);
    //     setError(error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });

    /* using axios */
    axios({
      method: 'post',
      url: url,
      data: { formID: formID },
    })
      .then((response) => {
        //@TODO
        // - better regexp for inline js: look ahead for no 'src' attribute
        // [x] load JS is same order?
        // [x] remove JS from form HTML
        // [x] inject JS in same place? doesn't make a difference as long as core FA JS is loaded first

        // *** NOTE: Google search "javascript inject into dom doesn't work" ***

        // for inline JS, try:
        // - jquery .html() which will evaluate the inline code?  (must inject jQuery src also)
        // - eval()???
        // - document.write()?
        // - reference:
        //      - HTML5 forbids injecting JS code into DOM to prevent XSS attacks:
        //          - https://stackoverflow.com/questions/47625341/injected-script-doesnt-execute-even-with-script-tags-fixed-up
        //      - try jQuery.html() or document.write()
        //         https://security.stackexchange.com/questions/240353/how-is-it-possible-that-a-script-tag-was-injected-but-not-executed

        let html = response.data;
        const containerElement = document.querySelector('[class^="container-module--root"]');

        const jsAllRE = /<script.*?>(.*?)<\/script>/gims;
        const jsSrcRE = /(<script.*?><\/script>)/gims;
        const jsInlineRE = /<script((?:(?!src=).)*?)>(.*?)<\/script>/gims;

        const jsAll = html.match(jsAllRE);
        const jsSrc = html.match(jsSrcRE);
        const jsInline = html.match(jsInlineRE);

        console.log(`*** SVU: jsAll`, jsAll);
        //console.log(`*** SVU: jsSrc`, jsSrc);
        //console.log(`*** SVU: jsInline`, jsInline);

        /* get the main FA wforms.js */
        jsAll.forEach((js, i) => {
          if (js.match(/<script.*?src=['"](.+?)['"].*?>(.*?)<\/script>/ims)) {
            // console.log(`*** SVU: ${i+1} found JS src`,js);
            const faScript = document.createElement('script');
            faScript.setAttribute('type', 'text/javascript');
            faScript.setAttribute('data-ot-ignore', 'true');
            const src = js.match(/src=['"](.*?)['"]/i)[1]; // @TODO: better null checking
            // console.log(`*** SVU: section-formassembly.js: src is `, js.match(/src=['"](.*?)['"]/i));
            faScript.src = src;
            if (src.match(/wforms\.js/i)) {
              document.body.prepend(faScript);
              console.log(`*** SVU: appended main FA JS`);
            }
          }
        });

        /* don't load anything else until `wFORMS` object has been instantiated in wforms.js */
        const wformsInterval = setInterval(() => {
          let numChecks = 0;
          const maxChecks = 20;
          if (typeof wFORMS !== 'undefined') {
            clearInterval(wformsInterval);
            console.log(`*** SVU: wFORMs defined`, wFORMS);

            /* load all other FA js */
            jsAll.forEach((js, i) => {
              if (js.match(/<script.*?src=['"](.+?)['"].*?>(.*?)<\/script>/ims)) {
                // console.log(`*** SVU: ${i+1} found JS src`,js);
                const faScript = document.createElement('script');
                faScript.setAttribute('type', 'text/javascript');
                faScript.setAttribute('data-ot-ignore', 'true');
                const src = js.match(/src=['"](.*?)['"]/i)[1]; // @TODO: better null checking
                // console.log(`*** SVU: section-formassembly.js: src is `, js.match(/src=['"](.*?)['"]/i));
                faScript.src = src;
                if (!src.match(/wforms\.js/i)) {
                  containerElement.append(faScript);
                }
              } else {
                // console.log(`*** SVU: ${i+1} found JS inline`,js);
                const faScript = document.createElement('script');
                faScript.setAttribute('type', 'text/javascript');
                faScript.setAttribute('data-ot-ignore', 'true');
                faScript.setAttribute('id', `steve-inlinejs-${i}`);
                let inline = js.match(/<script.*?>(.*?)<\/script>/ims)[1]; // @TODO: better null checking
                // console.log(`*** SVU: section-formassembly.js: inline is `, inline);
                if (i == 3) {
                  inline += `console.log('*** SVU: appended inline javascript does run!!!')`;
                }
                // faScript.innerHTML = inline;
                faScript.append(document.createTextNode(inline));
                containerElement.append(faScript);
              }
            });
            /* remove all JS in HTML */
            jsAll.forEach((js, i) => {
              html = html.replace(js, '');
            });
            setFormHTML(html);
          } else {
            console.log(`*** SVU: wFORMs not yet defined; checking again # ${++numChecks}`);
            if (numChecks > 20) {
              clearInterval(wformsInterval);
              console.log(`*** SVU: wFORMS still not defined after ${maxChecks} attempts; exiting ...`);
            }
          }
        }, 100);
      })
      .catch((error) => {
        console.log(`ERROR: error thrown trying to get FormAssembly content`, error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Section isPageContent={isPageContent} key={_key} color="white" noPaddingTop={noPaddingTop}>
      <Container>{isLoading ? <p>Loading ...</p> : <div dangerouslySetInnerHTML={{ __html: formHTML }} />}</Container>
    </Section>
  );
};

export default SectionFormAssembly;
