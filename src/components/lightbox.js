import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import VideoPlayer from './video-player';
import styles from './lightbox.module.css';
import layoutStyles from './layout/layout.module.css';
import FilePreview from './projects/file-preview';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Swiper from 'react-id-swiper';
import { imageUrlFor } from '../lib/image-url';
import { buildImageObj, cn, CaptionAndDescription } from '../lib/helpers';
import { ConditionalWrapper } from '../utils/tools';
import IconButton from '@material-ui/core/IconButton';
import '../styles/swiper.css';

Modal.setAppElement('#___gatsby');

const useStyles = makeStyles({
  closeBtn: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
  },
  prevBtn: {
    position: 'absolute',
    zIndex: 1,
    top: 'calc(50% - 0.75em)',
    left: 0,
  },
  nextBtn: {
    position: 'absolute',
    zIndex: 1,
    top: 'calc(50% - 0.75em)',
    right: 0,
  },
});

// Modal Lightbox - contains carousel of media items
export default forwardRef(function Lightbox({ media }, ref) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);
  const [swiper, updateSwiper] = useState(null);
  const classes = useStyles();

  // close the modal
  const closeModal = () => setIsModalOpen(false);

  const onAfterClose = () => {
    if (typeof window !== 'undefined') window.scrollTo(0, scrollPos);
  };

  // expose public methods
  useImperativeHandle(ref, () => ({
    openItem(idx) {
      if (typeof window !== 'undefined') setScrollPos(window.scrollY);
      setSelectedMediaIndex(idx);
      setIsModalOpen(true);
    },
    close() {
      closeModal();
    },
  }));

  useEffect(() => {
    let timeout;
    // fix issue with swiper not working on first load
    // see https://github.com/kidjp85/react-id-swiper/issues/261
    if (swiper !== null) {
      timeout = setTimeout(() => swiper.update(), 500);
      if (swiper.slideTo && swiper.params) {
        swiper.slideTo(selectedMediaIndex, 300);
      }
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [swiper]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      onAfterClose={onAfterClose}
      contentLabel="Example Modal"
      className={{
        base: styles.lightboxBase,
        afterOpen: styles.lightboxAfterOpen,
        beforeClose: styles.lightboxBeforeClose,
      }}
      overlayClassName={styles.lightboxOverlay}
      bodyOpenClassName={styles.lightboxBodyOpen}
      htmlOpenClassName={styles.lightboxHtmlOpen}
    >
      <div>
        <div className={styles.lightboxContent}>
          {media && media.length > 0 && (
            <Swiper
              getSwiper={updateSwiper}
              navigation={{ nextEl: '.lightbox-next-btn', prevEl: '.lightbox-prev-btn' }}
              pagination={{
                el: '.swiper-pagination',
                clickable: true,
                // eslint-disable-next-line react/display-name
                renderBullet: (index, className) => {
                  return media.length > 1 ? `<span class="${cn(styles.lightboxBullet, className)}"></span>` : '';
                },
              }}
              loop={false}
              spaceBetween={160}
              renderNextButton={() =>
                media.length > 1 ? (
                  <IconButton color="inherit" className={cn(styles.lightboxNextBtn, 'lightbox-next-btn')}>
                    <ChevronRightIcon />
                  </IconButton>
                ) : null
              }
              renderPrevButton={() =>
                media.length > 1 ? (
                  <IconButton color="inherit" className={cn(styles.lightboxPrevBtn, 'lightbox-prev-btn')}>
                    <ChevronLeftIcon />
                  </IconButton>
                ) : null
              }
            >
              {media.map((item, idx) => (
                <div key={item._key}>
                  {/* Figure */}
                  {item && item._type === 'figure' && item.image && (
                    <ConditionalWrapper
                      condition={item.link}
                      wrapper={(children) => (
                        <a href={item.link} target="_blank" rel="noopener">
                          {children}
                        </a>
                      )}
                    >
                      <figure className={styles.figure}>
                        <img src={imageUrlFor(buildImageObj(item.image)).url()} alt={item.image.alt} />
                        <CaptionAndDescription media={item} />
                      </figure>
                    </ConditionalWrapper>
                  )}

                  {/* Video */}
                  {item && item._type === 'video' && (
                    <>
                      <VideoPlayer url={item.url} lightbox playing={selectedMediaIndex === idx} />
                      <CaptionAndDescription media={item} video />
                    </>
                  )}

                  {/* GIF */}
                  {item?._type === 'fileUpload' && item.file?.asset?.extension === 'gif' && (
                    <figure className={styles.figure}>
                      <img
                        src={item.file.asset.url}
                        alt={item.file.asset.originalFilename}
                        style={{ objectFit: 'contain', width: '100%' }}
                      />
                      <CaptionAndDescription media={item} className={layoutStyles.lightboxCaption} />
                    </figure>
                  )}

                  {/* PDF or other file */}
                  {item && item._type === 'fileUpload' && (
                    <>
                      <FilePreview file={item.file} caption={item.caption} title={item.title} />
                      <CaptionAndDescription media={item} className={layoutStyles.lightboxCaption} />
                    </>
                  )}
                </div>
              ))}
            </Swiper>
          )}
        </div>
        <IconButton color="inherit" onClick={closeModal} aria-label="Close modal" className={classes.closeBtn}>
          <CloseIcon />
        </IconButton>
      </div>
    </Modal>
  );
});
