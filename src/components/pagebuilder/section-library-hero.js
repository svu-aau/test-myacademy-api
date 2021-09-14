import React from 'react';
import { Hero } from '@aauweb/design-library';
import { root } from './section-library-hero.module.css';
import { urlFor } from '../../utils/tools';

const SectionLibraryHero = ({ section }) => {
  // console.log('SectionLibraryHero: ', section);
  return (
    <div className={root}>
      <Hero
        backgroundImage={
          section.backgroundImage &&
          urlFor(section.backgroundImage.asset.url).width(2200).auto('format').fit('max').url()
        }
        title={section.heroTitle}
      />
    </div>
  );
};

export default SectionLibraryHero;
