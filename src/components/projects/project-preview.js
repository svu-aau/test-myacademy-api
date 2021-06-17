import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { cn } from '../../lib/helpers';
import BlockText from '../block-text';

import styles from './project-preview.module.css';
import { responsiveTitle3 } from '../../styles/typography.module.css';
import { ConditionalWrapper } from '../../utils/tools';

function ProjectPreview(props) {
  // console.log('ProjectPreview props: ', props);
  const { school, slug, title, _rawExcerpt, linkOverride, masonry, media, small, heroImage, onClick } = props;
  let displayFeaturedMedia = {};
  if (heroImage && heroImage[0] && heroImage[0].image) {
    displayFeaturedMedia = heroImage[0];
  } else if (media) {
    displayFeaturedMedia = media[0];
  }

  const preventDefault = (event) => {
    event.preventDefault();
  };

  return (
    <ConditionalWrapper
      condition={school && slug && !(linkOverride && linkOverride !== '')}
      wrapper={(children) => (
        <Link
          className={cn(styles.root, small && styles.small, !masonry && styles.stdGrid)}
          to={`/schools/${school.slug.current}/projects/${slug.current}`}
          onClick={(e) => {
            if (onClick) {
              preventDefault(e);
              onClick();
            }
          }}
        >
          {children}
        </Link>
      )}
    >
      <ConditionalWrapper
        condition={linkOverride && linkOverride !== ''}
        wrapper={(children) => (
          <Link
            className={cn(styles.root, small && styles.small, !masonry && styles.stdGrid)}
            to={linkOverride}
            onClick={(e) => {
              if (onClick) {
                preventDefault(e);
                onClick();
              }
            }}
          >
            {children}
          </Link>
        )}
      >
        <div className={masonry ? cn(styles.leadMediaThumb, styles.leadMediaThumbMasonry) : styles.leadMediaThumb}>
          {displayFeaturedMedia && displayFeaturedMedia.image && (
            <Img fluid={displayFeaturedMedia.image.asset.fluid} alt={displayFeaturedMedia.alt} />
          )}
          <h3 className={cn(responsiveTitle3, styles.title)}>{title}</h3>
          {_rawExcerpt && (
            <div className={styles.excerpt}>
              <BlockText blocks={_rawExcerpt} />
            </div>
          )}
        </div>
      </ConditionalWrapper>
    </ConditionalWrapper>
  );
}

export default ProjectPreview;
