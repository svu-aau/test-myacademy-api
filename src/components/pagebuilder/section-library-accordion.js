import React from 'react';

import { Accordion } from '@aauweb/design-library';

import Container from '../layout/container';
import ContentSections from './content-sections';

import { responsiveTitle2 } from '../../styles/typography.module.css';
import { accordion, accordionTitle } from './section-library-accordion.module.css';

import { cn } from '../../lib/helpers.js';

// see data/fragments/LibraryAccordionGroup
const SectionAccordionGroup = ({ section }) => {
  const { title, accordions } = section;

  const data = accordions.map((accordion) => {
    const content = <ContentSections content={accordion.contentArray} />;
    return [accordion.title, content];
  });
  return (
    <div className={accordion} id={section._key}>
      <Container>
        {title ? <h2 className={cn(responsiveTitle2, accordionTitle)}>{title}</h2> : ''}
        <Accordion data={data} />
      </Container>
    </div>
  );
};

export default SectionAccordionGroup;
