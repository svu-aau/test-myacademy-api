import React, { useRef, useState } from 'react';

import BlockContent from '../block-content';
import ColumnGrid from '../grids/column-grid';
import PaginationBar from '../grids/pagination-bar';
import Container from '../layout/container';
import Section from '../sections/section';
import { paginate } from '../../lib/helpers';

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

  let paginationData = paginate(1, media.length);
  let [pages, setPages] = useState(paginationData.pages.length);
  let [paginationLocation, setPaginationLocation] = useState([0, paginationData.endIndex]);
  const rootRef = useRef();

  const handlePagination = (num, projs = media) => {
    paginationData = paginate(num, projs.length);
    setPages(paginationData.pages.length);
    setPaginationLocation([paginationData.startIndex, paginationData.endIndex]);
    window.scroll({
      top: rootRef.current.offsetTop - 75,
      behavior: 'smooth',
    });
  };

  return (
    <div id={_key} key={_key} style={{ backgroundColor }} ref={rootRef}>
      {_rawIntro && (
        <Section color={backgroundColor} alignment="center">
          <Container narrower={narrowWidth}>
            <BlockContent blocks={_rawIntro} />
          </Container>
        </Section>
      )}

      {media?.length > 0 && (
        <>
          <ColumnGrid
            items={showPagination ? media.slice(paginationLocation[0], paginationLocation[1]) : media.slice(0, limit)}
            // hiding link override for now for shared global grids linkOverride={linkOverride}
            type="assets"
            media
          />
          {showPagination && <PaginationBar pages={pages} handleClick={handlePagination} isDark={true} />}
        </>
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

export default SectionMediaGrid;
