import React from 'react';

import Container from '../layout/container';
import Section from '../sections/section';
import BlockContent from '../block-content';

// see data/fragments/PageContent
const SectionCard = ({ section }) => {
  return (
    <Section key={section._key} color={section.backgroundColor} alignment="center">
      <Container narrow={section.narrowWidth}>
        {section._rawBody && <BlockContent blocks={section._rawBody} />}
      </Container>
    </Section>
  );
};

export default SectionCard;
