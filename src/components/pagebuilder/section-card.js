import React from 'react';

import Container from '../layout/container';
import Section from '../sections/section';
import BlockContent from '../block-content';

// see data/fragments/PageContent
const SectionCard = ({ section }) => {
  const split = section._rawBody && section._rawBodyRight;

  return (
    <Section
      id={section._key}
      key={section._key}
      color={section?.backgroundColor?.value}
      alignment={!split && 'left'}
      noPadding
    >
      <Container narrow={section.narrowWidth} split={split}>
        {/*
          The new react portable text library doesn't wrap the content anymore so we need to
          wrap it for the css split logic to work
        */}
        {section._rawBody && (
          <div>
            <BlockContent blocks={section._rawBody} />
          </div>
        )}
        {section._rawBodyRight && (
          <div>
            <BlockContent blocks={section._rawBodyRight} />
          </div>
        )}
      </Container>
    </Section>
  );
};

export default SectionCard;
