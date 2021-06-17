import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

import { cn, buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';
import styles from './student-preview.module.css';

function StudentPreview(props) {
  const { portfolio, slug, school, name, heroImage, masonry, featured, onClick } = props;

  let displayFeaturedMedia = {};
  if (heroImage && heroImage.length > 0) {
    heroImage.map((img) => {
      if (!img.isHeadShot) {
        displayFeaturedMedia = img;
        return;
      }
    });
  } else if (portfolio) {
    displayFeaturedMedia = portfolio[0];
  }

  const preventDefault = (event) => {
    event.preventDefault();
  };

  return (
    school.slug &&
    slug &&
    slug.current && (
      <Link
        className={styles.root}
        to={`/schools/${school.slug.current}/students/${slug.current}`}
        onClick={(e) => {
          if (onClick) {
            preventDefault(e);
            onClick();
          }
        }}
      >
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
