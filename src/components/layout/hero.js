import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { mainImage } from './header.module.css';

// backgroundImage should be a fluid image asset
const Hero = ({ backgroundImage, imageAlt = 'Academy of Art University' }) => {
  return (
    <div className="hero">
      {backgroundImage && (
        <img src={backgroundImage} className={mainImage} loading="eager" alt={imageAlt ? imageAlt : 'hero image'} />
      )}
    </div>
  );
};

export default Hero;
