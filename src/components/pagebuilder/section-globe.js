import React from 'react';

import Globe from '../sections/globe';
import Container from '../layout/container';
import Section from '../sections/section';

// see data/fragments/PageContent
const SectionGlobe = ({ section }) => {
  const { title, body, infoOne, infoTwo } = section;

  return (
    <Section key={'sanityGlobeSectionKey'} alignment="center" globe>
      <Globe />
    </Section>
  );
};

export default SectionGlobe;
