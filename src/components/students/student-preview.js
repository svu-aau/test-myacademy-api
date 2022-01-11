import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

import { cn } from '../../lib/helpers';
import {
  root,
  leadMediaThumb,
  leadMediaThumbFeatured,
  leadMediaThumbMasonry,
  title,
} from './student-preview.module.css';

function StudentPreview(props) {
  const { portfolio, slug, school, name, heroImage, masonry, featured, onClick } = props;

  let displayFeaturedMedia = {};
  if (heroImage && heroImage.length > 0) {
    displayFeaturedMedia = heroImage[0];
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
        className={root}
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
            masonry ? cn(leadMediaThumb, leadMediaThumbMasonry) : featured ? leadMediaThumbFeatured : leadMediaThumb
          }
        >
          {displayFeaturedMedia && displayFeaturedMedia.image && masonry && (
            <GatsbyImage
              image={displayFeaturedMedia.image.childImageSharp.gatsbyImageData}
              alt={displayFeaturedMedia.alt}
            />
          )}

          {displayFeaturedMedia && displayFeaturedMedia.image && !masonry && (
            <GatsbyImage
              image={displayFeaturedMedia.image.childImageSharp.gatsbyImageData}
              alt={displayFeaturedMedia.alt}
              style={{ position: 'static' }}
            />
          )}
          <h3 className={title}>{name}</h3>
        </div>
      </Link>
    )
  );
}

export default StudentPreview;
