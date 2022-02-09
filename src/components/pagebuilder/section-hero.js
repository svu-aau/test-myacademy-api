import React from 'react';
import Hero from '../layout/hero';

const SectionHero = ({ section }) => (
  <Hero
    key={section._key}
    backgroundImage={section.backgroundImage && section.backgroundImage.asset && section.backgroundImage.asset.url}
    siteSubtitle={section.heroTitle}
    siteTitle={section.heroHeading}
    heroImageCaption={section.heroImageCaption}
  />
);

export default SectionHero;
