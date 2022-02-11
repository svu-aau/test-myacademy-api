import React from 'react';
import Container from '../layout/container';
import Section from '../sections/section';
import BlockContent from '../block-content';

const SectionText = ({ section: { _key, _rawBody, narrowWidth }, textOnly, noPaddingTop }) => {
  if (textOnly && _rawBody) {
    return <BlockContent blocks={_rawBody} />;
  }

  return (
    <Section isPageContent key={_key} color="white" noPaddingTop={noPaddingTop}>
      <Container narrower={narrowWidth}>{_rawBody && <BlockContent blocks={_rawBody} />}</Container>
    </Section>
  );
};

export default SectionText;
