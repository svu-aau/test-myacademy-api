import React, { createRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AspectRatio } from 'react-aspect-ratio';

import MUIGrid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Container, Paper } from '@material-ui/core';

import ContentSections from './content-sections';

import { responsiveTitle2 } from '../../styles/typography.module.css';
import { cn } from '../../lib/helpers.js';
import {
  root,
  cardTitle,
  cardSubtitle,
  inActive,
  functionalGridTitle,
  contentClose,
} from './section-modal-grid.module.css';

const SectionMediaGrid = ({ section }) => {
  const ratio = section.grids.length === 1 ? '2/1' : section.grids.length === 2 ? '6/4' : '4/3';

  const [modalState, setModalState] = useState({ position: -1, active: -1, open: false });

  const gridContentTarget = createRef(null);

  const handleAction = (idx) => {
    if (modalState.active === idx) {
      setModalState({
        position: -1,
        active: -1,
        open: false,
      });
      return;
    }

    if (window.matchMedia('(min-width: 600px) and (max-width: 959px)').matches) {
      const rational = (idx + 1) % 2;
      const gridPosition = idx + (rational ? 2 - rational : rational);
      setModalState({
        position: section.grids[gridPosition] ? gridPosition : section.grids.length - 1,
        active: idx,
        open: true,
      });
    } else if (window.matchMedia('(min-width: 960px)').matches) {
      const rational = (idx + 1) % 3;
      const gridPosition = idx + (rational ? 3 - rational : rational);
      setModalState({
        position: section.grids[gridPosition] ? gridPosition : section.grids.length - 1,
        active: idx,
        open: true,
      });
    } else {
      setModalState({
        position: idx,
        active: idx,
        open: true,
      });
    }
  };

  const closeGridContent = () => {
    setModalState({
      position: -1,
      active: -1,
      open: false,
    });
  };

  useEffect(() => {
    if (section.grids[modalState.active]) {
      ReactDOM.render(
        <ContentSections content={section.grids[modalState.active].contentArray} />,
        gridContentTarget.current
      );
    }
  }, [modalState]);

  return (
    <section className={root}>
      <Container>
        {section.title ? <h2 className={cn(responsiveTitle2, functionalGridTitle)}>{section.title}</h2> : ''}
        <MUIGrid container>
          <MUIGrid container spacing={3}>
            {section.grids.map((grid, idx) => (
              <>
                <MUIGrid key={idx} item xs={12} sm={6} md={4} onClick={() => handleAction(idx)}>
                  <div>
                    <AspectRatio ratio={ratio}>
                      <img
                        className={modalState.open && modalState.active !== idx ? inActive : ''}
                        src={grid.media.image.asset.url}
                      />
                    </AspectRatio>
                    <p className={cardTitle}>{grid.title}</p>
                    <p className={cardSubtitle}>{grid.subtitle}</p>
                  </div>
                </MUIGrid>
                {idx === modalState.position && (
                  <MUIGrid item sm={12} style={{ position: 'relative' }}>
                    <Button className={contentClose} onClick={closeGridContent}>
                      <CloseIcon fontSize="large" />
                    </Button>
                    <Paper elevation={2} ref={gridContentTarget} />
                  </MUIGrid>
                )}
              </>
            ))}
          </MUIGrid>
        </MUIGrid>
      </Container>
    </section>
  );
};

export default SectionMediaGrid;
