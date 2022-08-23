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
        let html = response.data;
        html = html.replace(/<script(.*?)>/gi, '<script data-ot-ignore$1>');
        setFormHTML(html);
      })
      .catch((error) => {
        console.log(`ERROR: error thrown trying to get FormAssembly content`, error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoading]);

  return (
    <Section isPageContent={isPageContent} key={_key} color="white" noPaddingTop={noPaddingTop}>
      <Container>{isLoading ? <p>Loading ...</p> : <div dangerouslySetInnerHTML={{ __html: formHTML }} />}</Container>
    </Section>
  );
};

export default SectionFormAssembly;
