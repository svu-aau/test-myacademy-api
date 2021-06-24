import React from 'react';

import Container from '../layout/container';
import Section from '../sections/section';
import ContentSections from './content-sections';

// see data/fragments/PageContent
const SectionColumn = ({ section }) => {
  console.log('section', section);

  return (
    <Section key={section._key} color={section.backgroundColor}>
      <Container narrow={section.narrowWidth} split>
        <ContentSections content={section.sectionLeft} isPageContent />
        <ContentSections content={section.sectionRight} isPageContent />
      </Container>
    </Section>
  );
};

export default SectionColumn;
