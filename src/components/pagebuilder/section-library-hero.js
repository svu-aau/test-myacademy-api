import React from 'react';
import { Hero } from '@aauweb/design-library';
import { root } from './section-library-hero.module.css';
import { urlFor } from '../../utils/tools';

const SectionLibraryHero = ({ section }) => (
  <div className={root}>
    <Hero
      backgroundImage={urlFor(section.backgroundImage.asset.url).maxWidth(2200).maxHeight(600).auto('format').url()}
      title={section.heroTitle}
    />
  </div>
);

export default SectionLibraryHero;
