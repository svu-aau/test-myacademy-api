import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import clientConfig from '../../client-config';
import { getGatsbyImageData } from 'gatsby-source-sanity';
import { caption } from './layout/layout.module.css';
import { root } from './figure.module.css';

const figure = ({ value }) => {
  if (!value.image) {
    return null;
  }

  const gatsbyImageData = getGatsbyImageData(value?.image, { width: 675 }, clientConfig.sanity);

  return (
    <figure className={root}>
      <GatsbyImage image={gatsbyImageData} alt={value.alt} />
      {value.caption && <figcaption className={caption}>{value.caption}</figcaption>}
    </figure>
  );
};

export default figure;
