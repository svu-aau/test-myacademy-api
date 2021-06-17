import React from 'react';
import Img from 'gatsby-image';
import styles from './header.module.css';

// backgroundImage should be a fluid image asset
const Hero = ({
  backgroundImage,
  siteTitle,
  siteSubtitle,
  imageAlt = 'Academy of Art University',
  heroImageCaption,
}) => {
  return (
    <div className="hero">
      <div className={styles.mainImage}>
        {/* --color-dark-black-bg: #292931; */}
        {backgroundImage && (
          <Img
            backgroundColor="#292931"
            className={styles.hero}
            loading="eager"
            fluid={backgroundImage}
            alt={imageAlt ? imageAlt : 'hero image'}
          />
        )}
        {siteTitle && <h3 className={styles.heroTitle}>{siteTitle}</h3>}
        {siteSubtitle && <h1 className={styles.title}>{siteSubtitle}</h1>}
        {heroImageCaption && <figcaption className={styles.heroImageCaption}>{heroImageCaption}</figcaption>}
      </div>
    </div>
  );
};

export default Hero;
