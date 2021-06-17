import React from 'react';

import Container from '../layout/container';
import Section from '../sections/section';
import BlockContent from '../block-content';

// see data/fragments/PageContent
const SectionCard = ({ section }) => {
  const split = section._rawBody && section._rawBodyRight;

  return (
    <Section key={section._key} color={section.backgroundColor} alignment={!split && 'center'}>
      <Container narrow={section.narrowWidth} split={split}>
        {section._rawBody && <BlockContent blocks={section._rawBody} />}
        {section._rawBodyRight && <BlockContent blocks={section._rawBodyRight} />}
      </Container>
    </Section>
  );
};

export default SectionCard;
