import React from 'react';
import ReactPlayer from 'react-player';
import styles from '../styles/video.module.css';
import { cn } from '../lib/helpers';

export default function VideoPlayer({ url, thumbnail = false, lightbox = false, playing = false }) {
  return (
    <div className={lightbox ? cn(styles.videoWrapper, styles.videoWrapperLightbox) : styles.videoWrapper}>
      <ReactPlayer url={url} controls={!thumbnail} light={thumbnail} playing={playing} width="100%" height="100%" />
    </div>
  );
}
