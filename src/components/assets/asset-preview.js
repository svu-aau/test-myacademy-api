import React from 'react';
import Img from 'gatsby-image';
import { buildImageObj, cn } from '../../lib/helpers';
import { responsiveTitle3 } from '../../styles/typography.module.css';
import BlockText from '../block-text';
import styles from '../projects/project-preview.module.css';
import layoutStyles from '../layout/layout.module.css';
import { imageUrlFor } from '../../lib/image-url';

function AssetPreview(props) {
  const { _rawExcerpt, media, image, masonry, featured, hasLightbox = false } = props;
  const displayFeaturedImage = image ? image : media;
  const caption =
    displayFeaturedImage && displayFeaturedImage.caption
      ? displayFeaturedImage.caption
      : displayFeaturedImage.image.caption || null;

  return (
    <div
      className={
        masonry
          ? cn(styles.leadMediaThumb, styles.leadMediaThumbMasonry)
          : featured
          ? styles.leadMediaThumbFeatured
          : styles.leadMediaThumb
      }
    >
      {displayFeaturedImage && displayFeaturedImage.image && displayFeaturedImage.image.asset.url.includes('.gif') ? (
        <>
          <img src={displayFeaturedImage.image.asset.url} alt={displayFeaturedImage.image.alt} />
          {hasLightbox && (
            <div className={layoutStyles.preloadHidden}>
              <img src={displayFeaturedImage.image.asset.url} width="1" height="1" alt="Hidden preload image" />
            </div>
          )}
        </>
      ) : (
        <>
          <Img fluid={displayFeaturedImage.image.asset.fluid} alt={displayFeaturedImage.image.alt} />
          {hasLightbox && (
            <div className={layoutStyles.preloadHidden}>
              <img
                src={imageUrlFor(buildImageObj(displayFeaturedImage.image)).url()}
                width="1"
                height="1"
                alt="Hidden preload image"
              />
            </div>
          )}
        </>
      )}
      {caption && <h3 className={cn(responsiveTitle3, styles.title)}>{caption}</h3>}
      {_rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={_rawExcerpt} />
        </div>
      )}
    </div>
  );
}

export default AssetPreview;
