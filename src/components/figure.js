import React from 'react';
import Img from 'gatsby-image';
import { getFluidGatsbyImage } from 'gatsby-source-sanity';
import clientConfig from '../../client-config';
import layoutStyles from './layout/layout.module.css';
import styles from './figure.module.css';

export default ({ node }) => {
  if (!node.image) {
    return null;
  }

  const fluidProps = getFluidGatsbyImage(node.image, { maxWidth: 675 }, clientConfig.sanity);

  return (
    <figure className={styles.root}>
      <Img fluid={fluidProps} alt={node.alt} />
      {node.caption && <figcaption className={layoutStyles.caption}>{node.caption}</figcaption>}
    </figure>
  );
};
