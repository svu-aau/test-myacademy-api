import { Link } from 'gatsby';
import React from 'react';
import styles from './school-preview.module.css';
import Img from 'gatsby-image';

function SchoolPreview(props) {
  const { heroImage } = props;
  return (
    <Link className={styles.root} to={`/schools/${props.slug.current}`}>
      <div className={styles.leadMediaThumb}>
        {heroImage && heroImage.asset && (
          <Img fluid={heroImage.asset.fluid} alt={heroImage.alt} style={{ position: 'static' }} />
        )}
        <h3 className={styles.title}>{props.title}</h3>
      </div>
    </Link>
  );
}

export default SchoolPreview;
