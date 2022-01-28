import React from 'react';

import { Accordion } from '@aauweb/design-library';
import Container from '../layout/container';
import ContentSections from './content-sections';
import { accordion } from './section-library-accordion.module.css';

// see data/fragments/LibraryAccordionGroup
const SectionAccordionGroup = ({ section }) => {
  console.log(section);
  const data = section.accordions.map((accordion) => {
    const content = <ContentSections content={accordion.contentArray} />;
    return [accordion.title, content];
  });
  return (
    <div className={accordion} id={section._key}>
      <Container>
        <Accordion data={data} />
      </Container>
    </div>
  );
};

export default SectionAccordionGroup;
