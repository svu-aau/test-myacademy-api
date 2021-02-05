import React from 'react';

import BlockContent from '../block-content';
import ColumnGrid from '../grids/column-grid';
import Container from '../layout/container';
import FeaturedProjectsGrid from '../projects/featured-projects-grid';
import Section from '../sections/section';

const MAX_RESULTS = 999;

// see data/fragments/PageContent
const SectionImageGrid = ({ section }) => {
  const {
    _key,
    _rawIntro,
    _rawOutro,
    backgroundColor,
    gridStyle,
    limitResults,
    linkOverride,
    media,
    narrowWidth,
    showPagination,
  } = section;

  const limit = limitResults && limitResults > 0 ? limitResults : MAX_RESULTS;

  // If school is select, use that featured list
  // otherwise, use selected list of images
  // if this imageList is empty, we will use allImages
  // console.log('media: ', media);

  return (
    <div key={_key} style={{ backgroundColor }}>
      {_rawIntro && (
        <Section color={backgroundColor} alignment="center">
          <Container narrower={narrowWidth}>
            <BlockContent blocks={_rawIntro} />
          </Container>
        </Section>
      )}

      {gridStyle === 'featured-image-grid' ? (
        <FeaturedProjectsGrid
          projects={media.length ? media.slice(0, limit) : null}
          showPagination={showPagination}
          linkOverride={linkOverride}
          type="assets"
        />
      ) : (
        <ColumnGrid
          items={media.length ? media.slice(0, limit) : null}
          showPagination={showPagination}
          linkOverride={linkOverride}
          type="assets"
        />
      )}

      {_rawOutro && (
        <Section color={backgroundColor} alignment="center">
          <Container narrower={narrowWidth}>
            <BlockContent blocks={_rawOutro} />
          </Container>
        </Section>
      )}
    </div>
  );
};

export default SectionImageGrid;
