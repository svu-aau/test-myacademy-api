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
  const formAssemblyContainerId = `formassembly-container-${formID}`;

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

        let faHTML = response.data;
        const faElement = document.querySelector(`#${formAssemblyContainerId}`);

        // find and load the core FA JS (wforms.js) first since it instatiates the wFORMS object used by other JS
        const faCoreJSMatches = faHTML.match(/<script.*?src=['"](.*?wforms\.js.*?)['"]/i);
        if (faCoreJSMatches && faCoreJSMatches[1]) {
          const faCoreJSElement = document.createElement('script');
          faCoreJSElement.src = faCoreJSMatches[1];
          faCoreJSElement.setAttribute('data-ot-ignore', '');
          faCoreJSElement.setAttribute('type', 'text/javascript');
          document.body.prepend(faCoreJSElement);
        }

        // don't insert FA HTML and JS until wFORMS object has been defined in core FA JS above (or will get wFORMs undefined error)
        const faInterval = setInterval(function () {
          let numChecks = 0;
          const maxChecks = 20;
          if (typeof wFORMS !== 'undefined') {
            clearInterval(faInterval);
            //console.log(`*** SVU: wFORMS defined after attempt ${++numChecks}: `, wFORMS);
            processInnerHtml(faElement, faHTML);
          } else {
            //console.log(`*** SVU: wFORMS not yet defined on attempt ${++numChecks}`);
            if (numChecks > maxChecks) {
              console.log(`*** SVU: wFORMS still not defined after ${maxChecks} checks`);
              clearInterval(faInterval);
            }
          }
        }, 500);

        // function to insert html into DOM, find all <script>s and replace .innerHTML inserted JS with new DOM elements
        // to get the JS to execute (ie, JS inserted via .innerHTML does not execute)
        // https://stackoverflow.com/a/47614491
        function processInnerHtml(elm, html) {
          // insert HTML into DOM
          elm.innerHTML = html;
          // get all script elements
          Array.from(elm.querySelectorAll('script')).forEach((oldScript) => {
            if (oldScript.src.match(/wforms\.js/i)) {
              oldScript.remove();
            } else {
              // create new script element to add to element
              const newScript = document.createElement('script');
              Array.from(oldScript.attributes).forEach((attr) => {
                newScript.setAttribute(attr.name, attr.value);
              });
              newScript.setAttribute('data-ot-ignore', '');
              // insert new script that, in theory, should execute because it was inserted as an element and not set thru innerHTML
              newScript.appendChild(document.createTextNode(oldScript.innerHTML));
              // replace old script (inserted through innerHTL)
              oldScript.parentNode.replaceChild(newScript, oldScript);
            }
          });
        }
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
      <Container>
        <div id={formAssemblyContainerId}></div>
      </Container>
    </Section>
  );
};

export default SectionFormAssembly;
