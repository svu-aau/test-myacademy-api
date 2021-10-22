import React from 'react';
import { Hero } from '@aauweb/design-library';
import { root } from './section-library-hero.module.css';
import { urlFor } from '../../utils/tools';

const SectionLibraryProfile = ({ section }) => (
  <div className={root}>
    <Hero
      backgroundImage={urlFor(section.profileImage.asset.url).width(2200).auto('format').fit('max').url()}
      title={section.profileTitle}
    />
  </div>
);

export default SectionLibraryProfile;
