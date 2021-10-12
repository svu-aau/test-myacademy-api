import React from 'react';
import Container from '../layout/container';
import Section from '../sections/section';

const SectionDebug = ({ section }) => (
  <Section key={section._key} color="green">
    <Container>
      <pre>{JSON.stringify(section, null, 2)}</pre>
    </Container>
  </Section>
);

export default SectionDebug;
