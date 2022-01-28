import React from 'react';
import { Carousel } from '@aauweb/design-library';

import Container from '../layout/container';
import BlockContent from '../block-content';

import { responsiveTitle2 } from '../../styles/typography.module.css';
import { carousel, carouselDescription, carouselTitle } from './section-library-image-carousel.module.css';

import { cn } from '../../lib/helpers.js';

// see data/fragments/LibraryCarousel
const SectionLibraryImageCarousel = ({ section }) => {
  const { title, description, carouselImages } = section;

  const data = carouselImages.map(({ alt, caption, image, id }) => ({
    id,
    image: image.asset.url,
    alt,
    caption,
  }));

  return (
    <div className={carousel} id={section._key}>
      <Container>
        {title ? <h2 className={cn(responsiveTitle2, carouselTitle)}>{title}</h2> : ''}
        <Carousel data={data} />
        <div className={carouselDescription}>
          <BlockContent blocks={description} />
        </div>
      </Container>
    </div>
  );
};

export default SectionLibraryImageCarousel;
