import React from 'react';

import { Hero } from '@aauweb/design-library';
import BlockContent from '../block-content';
import Section from '../sections/section';
// import {Hero} from '../../../../../Design-Library/aa-design-library';

const SectionLibraryHero = ({ section }) => {
  console.log(section);
  return <Hero image={section.backgroundImage.asset.fluid.src} />;
};

export default SectionLibraryHero;
