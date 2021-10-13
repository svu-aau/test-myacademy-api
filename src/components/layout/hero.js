import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { mainImage, hero, heroTitle, title } from './header.module.css';

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
      <div className={mainImage}>
        {/* --color-dark-black-bg: #292931; */}
        {backgroundImage && (
          <GatsbyImage
            image={backgroundImage}
            backgroundColor="#292931"
            className={hero}
            loading="eager"
            alt={imageAlt ? imageAlt : 'hero image'}
          />
        )}
        {siteTitle && <h3 className={heroTitle}>{siteTitle}</h3>}
        {siteSubtitle && <h1 className={title}>{siteSubtitle}</h1>}
        {heroImageCaption && <figcaption className={heroImageCaption}>{heroImageCaption}</figcaption>}
      </div>
    </div>
  );
};

export default Hero;
