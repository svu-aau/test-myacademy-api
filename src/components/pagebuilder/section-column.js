import React from 'react';

import Container from '../layout/container';
import Section from '../sections/section';
import ContentSections from './content-sections';

// see data/fragments/PageContent
const SectionColumn = ({ section, noPadding }) => {
  // console.log('section', section);

  return (
    <Section key={section._key} color={section.backgroundColor} noPadding={noPadding}>
      <Container narrow={section.narrowWidth} split>
        <div>
          <ContentSections content={section.sectionLeft} isPageContent noPaddingTop />
        </div>
        <div>
          <ContentSections content={section.sectionRight} isPageContent noPaddingTop />
        </div>
      </Container>
    </Section>
  );
};

export default SectionColumn;
