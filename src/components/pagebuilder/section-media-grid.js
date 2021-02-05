import React from 'react';

import BlockContent from '../block-content';
import ColumnGrid from '../grids/column-grid';
import Container from '../layout/container';
import Lightbox from '../lightbox';
import Section from '../sections/section';

const MAX_RESULTS = 999;

// see data/fragments/PageContent
const SectionMediaGrid = ({ section }) => {
  const {
    _key,
    _rawIntro,
    _rawOutro,
    backgroundColor,
    limitResults,
    linkOverride,
    media,
    narrowWidth,
    showPagination,
  } = section;

  const limit = limitResults && limitResults > 0 ? limitResults : MAX_RESULTS;

  return (
    <div key={_key} style={{ backgroundColor }}>
      {_rawIntro && (
        <Section color={backgroundColor} alignment="center">
          <Container narrower={narrowWidth}>
            <BlockContent blocks={_rawIntro} />
          </Container>
        </Section>
      )}

      <ColumnGrid
        items={media.length ? media.slice(0, limit) : null}
        showPagination={showPagination}
        // hiding link override for now for shared global grids linkOverride={linkOverride}
        type="assets"
        media
      />

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

export default SectionMediaGrid;
