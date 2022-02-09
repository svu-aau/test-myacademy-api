import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { mainImage, hero, heroTitle, title } from './header.module.css';
import Container from './container';

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
      <img src={backgroundImage} alt={imageAlt} className={mainImage} />
    </div>
  );
};

export default Hero;
