import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { buildImageObj, cn } from '../../lib/helpers';
import { responsiveTitle3 } from '../../styles/typography.module.css';
import BlockText from '../block-text';
import { leadMediaThumb, title, excerpt } from '../projects/project-preview.module.css';
import { leadMediaThumbMasonry, leadMediaThumbFeatured } from '../students/student-preview.module.css';
import { preloadHidden } from '../layout/layout.module.css';
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
        masonry ? cn(leadMediaThumb, leadMediaThumbMasonry) : featured ? leadMediaThumbFeatured : leadMediaThumb
      }
    >
      {displayFeaturedImage && displayFeaturedImage.image && displayFeaturedImage.image.asset.url.includes('.gif') ? (
        <>
          <img src={displayFeaturedImage.image.asset.url} alt={displayFeaturedImage.image.alt} />
          {hasLightbox && (
            <div className={preloadHidden}>
              <img src={displayFeaturedImage.image.asset.url} width="1" height="1" alt="Hidden preload" />
            </div>
          )}
        </>
      ) : (
        <>
          <GatsbyImage image={displayFeaturedImage.image.asset.gatsbyImageData} alt={displayFeaturedImage.alt} />
          {hasLightbox && (
            <div className={preloadHidden}>
              <img
                src={imageUrlFor(buildImageObj(displayFeaturedImage.image)).url()}
                width="1"
                height="1"
                alt="Hidden preload"
              />
            </div>
          )}
        </>
      )}
      {caption && <h3 className={cn(responsiveTitle3, title)}>{caption}</h3>}
      {_rawExcerpt && (
        <div className={excerpt}>
          <BlockText blocks={_rawExcerpt} />
        </div>
      )}
    </div>
  );
}

export default AssetPreview;
