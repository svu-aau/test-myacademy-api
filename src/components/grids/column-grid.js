import { Link } from 'gatsby';
import Masonry from 'react-masonry-css';
import React, { useRef } from 'react';

import AssetPreview from '../assets/asset-preview';
import { mediaInteractWrapper } from '../layout/layout.module.css';
import Lightbox from '../lightbox';
import ProjectPreview from '../projects/project-preview';
import {
  clickable,
  srOnly,
  myCollaborateMasonryGridColumn,
  myMasonryGridColumn,
  myMasonryGrid,
  grid,
} from './column-grid.module.css';
import VideoPlayer from '../video-player';

function ColumnGrid({ media, items, linkOverride, type = 'projects', isMasonry = true }) {
  let children = null;
  let mediaItems = [];
  const lightbox = useRef();

  if (type === 'assets') {
    mediaItems = items ? items.map((item) => item.media || item).flat() : [];
  }

  if (media) {
    children = mediaItems.map((item, idx) => {
      const { _key, _type } = item;
      if (_type === 'video' && item.url) {
        if (linkOverride && linkOverride !== '') {
          return (
            <Link key={_key} className={clickable} to={linkOverride}>
              <VideoPlayer url={item.url} thumbnail />
              <span className={srOnly}>Links to {linkOverride}</span>
            </Link>
          );
        } else {
          return (
            <div key={_key}>
              <button type="button" className={mediaInteractWrapper} onClick={() => lightbox.current.openItem(idx)}>
                <VideoPlayer url={item.url} thumbnail />
              </button>
            </div>
          );
        }
      } else if (_type === 'figure') {
        if (linkOverride && linkOverride !== '') {
          return (
            <Link key={idx} className={clickable} to={linkOverride}>
              <AssetPreview key={item._key} className={clickable} image={item} masonry />
              <span className={srOnly}>Links to {linkOverride}</span>
            </Link>
          );
        } else {
          return (
            <div key={idx} className={clickable} onClick={() => lightbox.current.openItem(idx)}>
              <AssetPreview hasLightbox key={item._key} className={clickable} image={item} masonry />
            </div>
          );
        }
      }
      return null;
    });
  } else if (type === 'projects') {
    children = items.map(
      (props) => props && <ProjectPreview linkOverride={linkOverride} key={props.id} masonry={isMasonry} {...props} />
    );
  } else {
    children = mediaItems.map((item, idx) =>
      linkOverride && linkOverride !== '' ? (
        <Link key={idx} className={clickable} to={linkOverride}>
          <AssetPreview key={item._key} className={clickable} image={item} masonry />
          <span className={srOnly}>Links to {linkOverride}</span>
        </Link>
      ) : (
        <div key={idx} className={clickable} onClick={() => lightbox.current.openItem(idx)}>
          <AssetPreview hasLightbox key={item._key} className={clickable} image={item} masonry />
        </div>
      )
    );
  }

  if (isMasonry) {
    return (
      <>
        <Masonry
          breakpointCols={{
            default: 4,
            900: 2,
            675: 1,
          }}
          className={myMasonryGrid}
          columnClassName={
            type === 'projects' && children.length < 4 ? myCollaborateMasonryGridColumn : myMasonryGridColumn
          }
        >
          {children}
        </Masonry>

        {mediaItems && <Lightbox ref={lightbox} media={mediaItems} />}
      </>
    );
  }

  return <div className={grid}>{children}</div>;
}

ColumnGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: '',
};

export default ColumnGrid;
