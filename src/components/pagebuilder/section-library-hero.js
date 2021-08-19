import React from 'react';
import { Hero } from '@aauweb/design-library';

const SectionLibraryHero = ({ section }) => (
  <div style={{ marginTop: '125px' }}>
    <Hero backgroundImage={section.backgroundImage.asset.fluid.src} title={section.heroTitle} />
  </div>
);

export default SectionLibraryHero;
