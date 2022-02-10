import React from 'react';
import Hero from '../layout/hero';

import { buildImageObj } from '../../lib/helpers.js';
import { imageUrlFor } from '../../lib/image-url';

const SectionHero = ({ section }) => {
  const generatedImage = imageUrlFor(buildImageObj(section.backgroundImage))
    .width(1080)
    .height(340)
    .fit('crop')
    .auto('format')
    .url();

  return (
    <Hero
      key={section._key}
      backgroundImage={generatedImage}
      siteSubtitle={section.heroTitle}
      siteTitle={section.heroHeading}
      heroImageCaption={section.heroImageCaption}
    />
  );
};

export default SectionHero;
