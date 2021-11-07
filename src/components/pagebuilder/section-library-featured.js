import React from 'react';
import { navigate } from 'gatsby';

import { Card } from '@aauweb/design-library';
import BlockContent from '../block-content';
import { root } from './section-library-featured.module.css';
import { urlFor } from '../../utils/tools';

/*
image, title, type, alt, children, buttonText, onClick
*/
const SectionLibraryFeatured = ({ section }) => {
  return (
    <div className={root} key={section._key}>
      <Card
        image={urlFor(section.image.asset.url).width(300).auto('format').fit('max').url()}
        alt={'test'}
        title={section.title}
        onClick={() => navigate(section.buttonLink)}
        type="alt"
        center
        buttonText={section.buttonText}
        rightAligned={section.rightAligned}
      >
        {section._rawBody && <BlockContent blocks={section._rawBody} />}
      </Card>
    </div>
  );
};

export default SectionLibraryFeatured;
