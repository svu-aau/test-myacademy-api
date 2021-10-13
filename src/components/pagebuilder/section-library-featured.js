import React from 'react';

import { Card } from '@aauweb/design-library';
import BlockContent from '../block-content';
import { root } from './section-library-featured.module.css';
import { urlFor } from '../../utils/tools';

/*
image, title, type, alt, children, buttonText, onClick
*/
const SectionLibraryFeatured = ({ section }) => {
  // console.log(section);
  return (
    <div className={root} key={section._key}>
      <Card
        image={urlFor(section.image.asset.url).width(300).auto('format').fit('max').url()}
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
