// Grid of project/portfolio items (figure, video, and fileUpload [including PDFs])
import React from 'react';
import Img from 'gatsby-image';
import FilePreview from '../projects/file-preview';
import Section from '../sections/section';
import styles from '../projects/project-profile.module.css';
import layoutStyles from '../layout/layout.module.css';

import { cn, CaptionAndDescription, buildImageObj } from '../../lib/helpers';
import VideoPlayer from '../video-player';
import { imageUrlFor } from '../../lib/image-url';

export default function PortfolioGrid({ media, showDescription = false, onItemClick = (idx) => {} }) {
  return media.map((media, idx) => {
    const { _type, _key } = media;
    if (_type === 'video') {
      return (
        media.url && (
          <div key={_key}>
            <button type="button" className={layoutStyles.mediaInteractWrapper} onClick={() => onItemClick(idx)}>
              <VideoPlayer url={media.url} thumbnail />
            </button>
            <CaptionAndDescription media={media} showDescription={showDescription} />
          </div>
        )
      );
    } else if (_type === 'figure') {
      return (
        media.image &&
        media.image.asset &&
        (media.image.asset.url.includes('.gif') ? (
          <div key={_key}>
            <button type="button" className={layoutStyles.mediaInteractWrapper} onClick={() => onItemClick(idx)}>
              <img className={styles.mainImage} src={media.image.asset.url} alt={media.alt} />
              <div className={layoutStyles.preloadHidden}>
                <img
                  src={imageUrlFor(buildImageObj(media.image)).url()}
                  width="1"
                  height="1"
                  alt="Hidden preload image"
                />
              </div>
            </button>
            <CaptionAndDescription media={media} showDescription={showDescription} />
          </div>
        ) : (
          <div key={_key}>
            <button type="button" className={layoutStyles.mediaInteractWrapper} onClick={() => onItemClick(idx)}>
              <Img
                className={styles.mainImage}
                fluid={media.image.asset.fluid}
                alt={media.alt}
                imgStyle={{ objectFit: 'contain' }}
              />
              <div className={layoutStyles.preloadHidden}>
                <img
                  src={imageUrlFor(buildImageObj(media.image)).url()}
                  width="1"
                  height="1"
                  alt="Hidden preload image"
                />
              </div>
            </button>
            <CaptionAndDescription media={media} showDescription={showDescription} />
          </div>
        ))
      );
    } else if (_type === 'fileUpload') {
      let color = 'white';
      if (media.file && media.file.asset) {
        if (media.file.asset.extension === 'pdf') {
          color = 'dark';
        }
        if (media.file.asset.extension === 'gif') {
          return (
            <div key={_key}>
              <button type="button" className={layoutStyles.mediaInteractWrapper} onClick={() => onItemClick(idx)}>
                <img className={styles.mainImage} src={media.file.asset.url} alt={media.alt} />
              </button>
              <CaptionAndDescription media={media} showDescription={showDescription} />
            </div>
          );
        }
      }
      return (
        <button
          type="button"
          key={_key}
          className={cn(layoutStyles.mediaInteractWrapper)}
          onClick={() => onItemClick(idx)}
        >
          <Section color={color} alignment="center" flush>
            <FilePreview key={_key} file={media.file} caption={media.caption} title={media.title} thumbnail />
          </Section>
          <CaptionAndDescription media={media} showDescription={showDescription} />
        </button>
      );
    }
  });
}
