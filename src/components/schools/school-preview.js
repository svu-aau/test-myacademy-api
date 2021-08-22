import { Link } from 'gatsby';
import React from 'react';
import { root, title, leadMediaThumb } from './school-preview.module.css';
import { GatsbyImage } from 'gatsby-plugin-image';

function SchoolPreview(props) {
  const { heroImage } = props;
  return (
    <Link className={root} to={`/schools/${props.slug.current}`}>
      <div className={leadMediaThumb}>
        {heroImage && heroImage.asset && (
          <GatsbyImage
            image={heroImage.childImageSharp.gatsbyImageData}
            alt={heroImage.alt}
            style={{ position: 'static' }}
          />
        )}
        <h3 className={title}>{props.title}</h3>
      </div>
    </Link>
  );
}

export default SchoolPreview;
