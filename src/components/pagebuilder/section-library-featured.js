import React from 'react';

import { Card } from '@aauweb/design-library';
import BlockContent from '../block-content';
import Section from '../sections/section';

/*
image, title, type, alt, children, buttonText, onClick
*/
const SectionLibraryFeatured = ({ section }) => {
  console.log(section);
  return (
    <Section key={section._key} /*color={backgroundColor}*/ alignment="center">
      <Card
        image={section.image.asset.fluid.src}
        alt={'test'}
        title={section.title}
        onClick={() => {}}
        type="alt"
        // buttonText="Hello"
      >
        {section._rawBody && <BlockContent blocks={section._rawBody} />}
      </Card>
    </Section>
  );
};

export default SectionLibraryFeatured;
