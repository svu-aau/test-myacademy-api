import React from 'react';
import { Hero } from '@aauweb/design-library';
import { root } from './section-library-hero.module.css';

const SectionLibraryHero = ({ section }) => (
  <div className={root}>
    <Hero backgroundImage={section.backgroundImage.asset.url} title={section.heroTitle} />
  </div>
);

export default SectionLibraryHero;
