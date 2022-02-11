import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { mainImage, hero } from './header.module.css';

// backgroundImage should be a fluid image asset
const Hero = ({ backgroundImage, imageAlt = 'Academy of Art University' }) => {
  return (
    <div className={hero}>
      <GatsbyImage
        image={backgroundImage}
        backgroundColor="#292931"
        className={mainImage}
        loading="eager"
        alt={imageAlt ? imageAlt : 'hero image'}
      />
    </div>
  );
};

export default Hero;
