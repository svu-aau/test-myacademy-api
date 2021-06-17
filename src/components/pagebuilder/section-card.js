import React from 'react';

import Container from '../layout/container';
import Section from '../sections/section';
import BlockContent from '../block-content';

// see data/fragments/PageContent
const SectionCard = ({ section, slug }) => {
  return (
    <Section key={section._key} color={section.backgroundColor} alignment="center">
      <Container narrow={section.narrowWidth}>
        {section._rawBody && !section._rawBodyRight && <BlockContent blocks={section._rawBody} />}
        {section._rawBodyRight && (
          <>
            <h1
              style={{
                fontSize: 'var(--font-title1-size)',
                lineHeight: 'var(--font-title1-line-height)',
                fontWeight: '900',
                margin: '1rem 0 1.5rem',
              }}
            >
              Contact Us
            </h1>
            <div style={{ display: 'flex' }}>
              <BlockContent blocks={section._rawBody} />
              <BlockContent blocks={section._rawBodyRight} />
            </div>
          </>
        )}
      </Container>
    </Section>
  );
};

export default SectionCard;
