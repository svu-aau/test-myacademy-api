import React from 'react';
import { navigate } from 'gatsby';
import Container from '../layout/container';
import Section from '../sections/section';
import BlockContent from '../block-content';
import { ImageGrid } from '@aauweb/design-library';
import { responsiveTitle2 } from '../../styles/typography.module.css';
import { myAcademyImgGrid, titleText } from './section-library-image-grid.module.css';
import { buildImageObj, cn } from '../../lib/helpers.js';
import { imageUrlFor } from '../../lib/image-url';
import { isExternalHrefPattern } from '../serializers';

const SectionLibraryImageGrid = ({ section }) => {
  const { title, imageItem } = section;

  const data = imageItem.map(({ alt, caption, image, title, link, _rawDescription }) => [
    imageUrlFor(buildImageObj(image)).width(500).fit('max').auto('format').url(),
    link ? [title, link] : title,
    caption,
    _rawDescription && <BlockContent blocks={_rawDescription} />,
  ]);

  return (
    <Section id={section._key} key={section._key} noPadding>
      <Container>
        <div className={myAcademyImgGrid}>
          {title ? <h2 className={cn(responsiveTitle2, titleText)}>{title}</h2> : ''}
          <ImageGrid
            data={data}
            onClick={(href) => {
              if (isExternalHrefPattern(href)) {
                window.open(href, '_blank');
              } else {
                navigate(href);
              }
            }}
          />
        </div>
      </Container>
    </Section>
  );
};

export default SectionLibraryImageGrid;
