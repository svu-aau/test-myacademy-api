import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import clientConfig from '../../client-config';
import { getGatsbyImageData } from 'gatsby-source-sanity';
import { caption } from './layout/layout.module.css';
import { root } from './figure.module.css';

const figure = ({ node }) => {
  if (!node.image) {
    return null;
  }

  const gatsbyImageData = getGatsbyImageData(node?.image, { maxWidth: 675 }, clientConfig.sanity);

  return (
    <figure className={root}>
      <GatsbyImage image={gatsbyImageData} alt={node.alt} />
      {node.caption && <figcaption className={caption}>{node.caption}</figcaption>}
    </figure>
  );
};

export default figure;
