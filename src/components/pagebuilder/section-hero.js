import React from 'react';
import Hero from '../layout/hero';
import clientConfig from '../../../client-config';
import { getGatsbyImageData } from 'gatsby-source-sanity';

const SectionHero = ({ section }) => {
  const gatsbyImageData = getGatsbyImageData(
    section.backgroundImage,
    { fit: 'max', aspectRatio: 16 / 9 },
    clientConfig.sanity
  );

  return (
    <Hero
      key={section._key}
      imageAlt={section.backgroundImage.alt}
      backgroundImage={gatsbyImageData}
      siteSubtitle={section.heroTitle}
      siteTitle={section.heroHeading}
      heroImageCaption={section.heroImageCaption}
    />
  );
};

export default SectionHero;
