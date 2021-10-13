import { isFuture } from 'date-fns';
import { lightboxVideoCaption, assetDescription } from '../components/layout/layout.module.css';
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
        <figcaption className={cn(caption, video ? lightboxVideoCaption : '')}>{caption}</figcaption>
      )}
      {link && link.trim() !== '' && (
        <figcaption className={cn(caption, video ? lightboxVideoCaption : '')}>
          <a href={link} target="_blank" rel="noopener" title={link}>
            {link}
          </a>
        </figcaption>
      )}
      {((credit && credit.trim() !== '') || (medium && medium.trim() !== '') || (height && height.trim() !== '')) && (
        <figcaption className={cn(caption, video ? lightboxVideoCaption : '')}>
          {credit && `Photo by: ${credit} `} {medium && `Medium: ${medium} `}{' '}
          {height && width && depth && `${height}x${width}x${depth}`}
        </figcaption>
      )}
      {showDescription && _rawDescription && (
        <div className={assetDescription}> {<BlockContent blocks={_rawDescription} />}</div>
      )}
    </>
  );
};

export const phoneFormat = (input) => {
  if (input) {
    // Strip all characters from the input except digits
    input = input.replace(/\D/g, '');

    // Trim the remaining input to ten characters, to preserve phone number format
    input = input.substring(0, 10);

    // Based upon the length of the string, we add formatting as necessary
    const size = input.length;
    if (size < 4) {
      input = '(' + input;
    } else if (size < 7) {
      input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
    } else {
      input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + '-' + input.substring(6, 10);
    }

    return input;
  }

  return '';
};

export const phoneNumValidation = (phoneNum) => {
  // eslint-disable-next-line no-useless-escape
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return phoneNum ? re.test(phoneNum) : true;
};

export const emailValidation = (email) => {
  const re = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return email ? re.test(email) : true;
};

export const paginate = (currentPage = 1, totalItems = 50) => {
  const pageSize = 20;
  const maxPages = 999;
  // calculate total pages
  let totalPages = Math.ceil(totalItems / pageSize);

  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage, endPage;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize, totalItems);

  // create an array of pages to ng-repeat in the pager control
  let pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);

  // return object with all pager properties required by the view
  return {
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages,
  };
};
