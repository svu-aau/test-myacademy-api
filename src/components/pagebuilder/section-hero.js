import React from 'react';
import Hero from '../layout/hero';
import clientConfig from '../../../client-config';
import { getGatsbyImageData } from 'gatsby-source-sanity';

const SectionHero = ({ section }) => {
  const gatsbyImageData = getGatsbyImageData(section.backgroundImage, { width: '100%' }, clientConfig.sanity);

  return (
    <Hero
      key={section._key}
      backgroundImage={gatsbyImageData}
      siteSubtitle={section.heroTitle}
      siteTitle={section.heroHeading}
      heroImageCaption={section.heroImageCaption}
    />
  );
};

export default SectionHero;
