import { isFuture } from 'date-fns';
import layoutStyles from '../components/layout/layout.module.css';
import BlockContent from '../components/block-content';
import React from 'react';

export function cn(...args) {
  return args.filter(Boolean).join(' ');
}

export function mapEdgesToNodes(data) {
  if (!data.edges) return [];
  return data.edges.map((edge) => edge.node);
}

// checks if an object has empty values like { x: '', y: '' }
export function emptyValues(obj) {
  return !obj || !Object.values(obj).some((x) => x !== null && x !== '');
}

export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current;
}

export function filterOutDocsPublishedInTheFuture({ publishedAt }) {
  return !isFuture(publishedAt);
}

export function buildImageObj(source) {
  let imageObj = {};
  if (source.asset) {
    imageObj = {
      asset: { _ref: source.asset._ref || source.asset._id },
    };
  }

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
}

export function selectProjectFeaturedMedia({ media, ...project }) {
  const featuredMedia = media.find((i) => i.featured);
  return {
    ...project,
    featuredMedia: featuredMedia,
  };
}

export const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());

export const capitalizeFirstLetter = (s) => {
  if (typeof s !== 'string') return '';
  return s[0].toUpperCase() + s.toLowerCase().slice(1);
};

export const sortByTitle = (collection) => {
  return collection
    .filter((o) => o && o.title !== undefined)
    .sort(({ title: a }, { title: b }) => (a < b ? -1 : a > b ? 1 : 0));
};
export const sortByName = (collection) => {
  return collection
    .filter((o) => o && o.name !== undefined)
    .sort(({ name: a }, { name: b }) => (a < b ? -1 : a > b ? 1 : 0));
};

export const CaptionAndDescription = (props) => {
  const { media, showDescription = false, video } = props;
  const { caption, credit, medium, height, width, depth, _rawDescription, link } = media;
  return (
    <>
      {caption && caption.trim() !== '' && (
        <figcaption className={cn(layoutStyles.caption, video ? layoutStyles.lightboxVideoCaption : '')}>
          {caption}
        </figcaption>
      )}
      {link && link.trim() !== '' && (
        <figcaption className={cn(layoutStyles.caption, video ? layoutStyles.lightboxVideoCaption : '')}>
          {link}
        </figcaption>
      )}
      {((credit && credit.trim() !== '') || (medium && medium.trim() !== '') || (height && height.trim() !== '')) && (
        <figcaption className={cn(layoutStyles.caption, video ? layoutStyles.lightboxVideoCaption : '')}>
          {credit && `Photo by: ${credit} `} {medium && `Medium: ${medium} `}{' '}
          {height && width && depth && `${height}x${width}x${depth}`}
        </figcaption>
      )}
      {showDescription && _rawDescription && (
        <div className={layoutStyles.assetDescription}> {<BlockContent blocks={_rawDescription} />}</div>
      )}
    </>
  );
};
