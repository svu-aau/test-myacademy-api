import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Modal from 'react-modal';
import Swiper from 'react-id-swiper';
import { Link } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';

import VideoPlayer from './video-player';
import styles from './lightbox.module.css';
import layoutStyles from './layout/layout.module.css';
import FilePreview from './projects/file-preview';
import { imageUrlFor } from '../lib/image-url';
import { buildImageObj, cn, CaptionAndDescription } from '../lib/helpers';
import '../styles/swiper.css';
import useWindowSize from '../lib/useWindowSize';

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
  profileLink: {
    textAlign: 'center',
    textDecoration: 'underline',
    display: 'block',
  },
});

// Modal Lightbox - contains carousel of media items
const Lightbox = ({ featured, media }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);
  const [swiper, updateSwiper] = useState(null);
  const classes = useStyles();
  const size = useWindowSize();
  const autoPlay = size.width >= 1200;

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
      swiper.on('realIndexChange', () => {
        if (autoPlay) {
          const { activeIndex } = swiper;
          setSelectedMediaIndex(activeIndex);
        }
      });
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [swiper]);

  const featuredCaption = (student, video = false) => {
    return (
      <>
        <figcaption className={cn(layoutStyles.caption, video ? layoutStyles.lightboxVideoCaption : '')}>
          {student?.name} / {student?.major?.title}
        </figcaption>

        <Link
          className={classes.profileLink}
          to={`/schools/${student.school.slug.current}/students/${student.slug.current}`}
        >
          Go To Student Profile
        </Link>
      </>
    );
  };

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
              {media.map((item, idx) => {
                if (item.__typename === 'SanityStudent') {
                  return (
                    <div key={item._key}>
                      <figure className={styles.figure}>
                        <img
                          src={imageUrlFor(buildImageObj(item.heroImage[0].image)).url()}
                          alt={item.heroImage[0].alt}
                        />
                        {featured ? featuredCaption(item) : <CaptionAndDescription media={item} />}
                      </figure>
                    </div>
                  );
                }
                return (
                  <div key={item._key}>
                    {/* Figure */}
                    {item && item._type === 'figure' && item.image && (
                      <figure className={styles.figure}>
                        <img src={imageUrlFor(buildImageObj(item.image)).url()} alt={item.image.alt} />
                        <CaptionAndDescription media={item} />
                      </figure>
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

                    {/* Game */}
                    {item && item._type === 'game' && (
                      <div className={styles.embedCode} dangerouslySetInnerHTML={{ __html: item.embedCode }} />
                    )}
                  </div>
                );
              })}
            </Swiper>
          )}
        </div>
        <IconButton color="inherit" onClick={closeModal} aria-label="Close modal" className={classes.closeBtn}>
          <CloseIcon />
        </IconButton>
      </div>
    </Modal>
  );
};

export default forwardRef(Lightbox);
