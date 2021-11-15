import React from 'react';
import { ImageGrid } from '@aauweb/design-library';
import { root } from './section-library-hero.module.css';
import { urlFor } from '../../utils/tools';

const SectionLibraryImageGrid = ({ section }) => {
  console.log(section);
  const { title, imageItem } = section;

  const data = imageItem.map(({ alt, caption, image, title }) => [
    image.asset.url,
    link ? [title, link] : title,
    caption,
  ]);

  return (
    <div className={root}>
      <ImageGrid data={data} />
    </div>
  );
};

export default SectionLibraryImageGrid;
