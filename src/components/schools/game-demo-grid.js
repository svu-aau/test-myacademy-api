import React, { useRef, useState } from 'react';
import { Link } from 'gatsby';
import styles from './game-demo-grid.module.css';
import Img from 'gatsby-image';
import BlockContent from '../block-content';
import Lightbox from '../lightbox';
import useWindowSize from '../../lib/useWindowSize';

function GameDemoGrid({ gameDemos }) {
  const lightbox = useRef();
  const [media, setMedia] = useState();
  const size = useWindowSize();
  const isPlayable = size.width >= 1200;

  const handleMedia = (demo) => {
    if (isPlayable) {
      const tempMedia = [
        {
          _type: 'game',
          embedCode: demo.embedCode,
        },
      ];

      setMedia(tempMedia);
      lightbox.current.openItem(0);
    }
  };

  return (
    <div className={styles.demoContainer}>
      {gameDemos.map((demo, idx) => {
        return (
          <div key={idx} className={styles.demoItem}>
            <div className={styles.demoItemContent}>
              <Img className={styles.demoImg} fluid={demo.heroImage.asset.fluid} alt={`game demo ${idx}`} />

              <div className={styles.demoContent}>
                <p className={styles.textCenter}>
                  <strong>{demo.title}</strong>
                </p>
                <BlockContent blocks={demo._rawIntro} />
                <p>
                  <strong>{'Project Owner: '}</strong>
                  <Link
                    className={styles.root}
                    to={`/schools/${demo.owner.school.slug.current}/students/${demo.owner.slug.current}`}
                  >
                    {demo.owner.name}
                  </Link>
                </p>
                <div>
                  <strong>Additional Credits:</strong>
                </div>
                <BlockContent blocks={demo._rawAdditionalCredit} />
                <p>
                  <strong>Platform:</strong>
                  {` ${demo.platform}`}
                </p>
              </div>
            </div>

            <div className={styles.demoPlayContainer} onClick={() => handleMedia(demo)}>
              <button className={styles.btnDemoPlay}> {isPlayable ? 'PLAY DEMO' : 'Playable on desktop only'} </button>
            </div>
          </div>
        );
      })}

      <Lightbox ref={lightbox} media={media} />
    </div>
  );
}

export default GameDemoGrid;
