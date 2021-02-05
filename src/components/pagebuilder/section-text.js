import React from 'react';
import Container from '../layout/container';
import Section from '../sections/section';
import BlockContent from '../block-content';

const SectionText = ({ section: { _key, _rawBody, narrowWidth } }) => (
  <Section key={_key} color="white">
    <Container narrower={narrowWidth}>
      <BlockContent blocks={_rawBody} />
    </Container>
  </Section>
);

export default SectionText;
