import React from 'react';

import { Card } from '@aauweb/design-library';
import BlockContent from '../block-content';
import { root } from './section-library-featured.module.css';

/*
image, title, type, alt, children, buttonText, onClick
*/
const SectionLibraryFeatured = ({ section }) => {
  console.log(section);
  return (
    <div className={root} key={section._key}>
      <Card
        image={section.image.asset.url}
        alt={'test'}
        title={section.title}
        onClick={() => {}}
        type="alt"
        center
        // buttonText="Hello"
      >
        {section._rawBody && <BlockContent blocks={section._rawBody} />}
      </Card>
    </div>
  );
};

export default SectionLibraryFeatured;
