import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

import { cn, buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';
import styles from './student-preview.module.css';

function StudentPreview(props) {
  const { portfolio, slug, school, name, heroImage, masonry, featured } = props;
  // console.log('StudentPreview props: ', props);

  let displayFeaturedMedia = {};
  if (heroImage && heroImage[0] && heroImage[0].image) {
    displayFeaturedMedia = heroImage[0];
  } else if (portfolio) {
    displayFeaturedMedia = portfolio[0];
  }

  return (
    school.slug &&
    slug &&
    slug.current && (
      <Link className={styles.root} to={`/schools/${school.slug.current}/students/${slug.current}`}>
        <div
          className={
            masonry
              ? cn(styles.leadMediaThumb, styles.leadMediaThumbMasonry)
              : featured
              ? styles.leadMediaThumbFeatured
              : styles.leadMediaThumb
          }
        >
          {displayFeaturedMedia && displayFeaturedMedia.image && masonry && (
            <Img fluid={displayFeaturedMedia.image.asset.fluid} alt={displayFeaturedMedia.alt} />
          )}

          {displayFeaturedMedia && displayFeaturedMedia.image && !masonry && (
            <Img
              fluid={displayFeaturedMedia.image.asset.fluid}
              alt={displayFeaturedMedia.alt}
              style={{ position: 'static' }}
            />
          )}
          <h3 className={styles.title}>{name}</h3>
        </div>
      </Link>
    )
  );
}

export default StudentPreview;
