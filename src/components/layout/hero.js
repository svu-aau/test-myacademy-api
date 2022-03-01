import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { mainImage, title, hero, heroTitle, heroImageCaption } from './header.module.css';

// backgroundImage should be a fluid image asset
const Hero = ({
  backgroundImage,
  title,
  siteTitle,
  siteSubtitle,
  heroImageCaption,
  imageAlt = 'Academy of Art University',
}) => {
  return (
    <div className={hero}>
      <GatsbyImage
        image={backgroundImage}
        backgroundColor="#292931"
        className={mainImage}
        loading="eager"
        alt={imageAlt ? imageAlt : 'hero image'}
      />
      {siteTitle && <h3 className={title}>{siteTitle}</h3>}
      {siteSubtitle && <h1 className={heroTitle}>{siteSubtitle}</h1>}
    </div>
  );
};

export default Hero;
