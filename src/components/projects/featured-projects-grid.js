import React, { useRef } from 'react';

import { cn } from '../../lib/helpers';
import AssetPreview from '../assets/asset-preview';
import Lightbox from '../lightbox';
import ProjectPreview from './project-preview';
import { root, grid, gridCell, clickable } from './featured-projects-grid.module.css';
import StudentPreview from '../students/student-preview';

function FeaturedProjectsGrid({ projects, type }) {
  const totalProjects = projects && projects.length;
  const lightbox = useRef();

  return (
    <>
      <div className={root}>
        <ul className={grid}>
          {projects &&
            projects.slice(0, 23).map((project, idx) => {
              let gridCellFirstLarge = false;
              let gridCellSecondLarge = false;
              let gridCellBottomLarge = false;

              const { __typename } = project;

              if (totalProjects > 14) {
                if (idx === 0) {
                  gridCellFirstLarge = true;
                }
                if (idx === 1) {
                  gridCellSecondLarge = true;
                }
                if (idx === 2) {
                  gridCellBottomLarge = true;
                }
              }

              if (type === 'assets' && project.caption && project.image) {
                project.image.caption = project.caption;
              }

              return (
                <li
                  className={cn(
                    gridCell,
                    gridCellSecondLarge && gridCellSecondLarge,
                    gridCellFirstLarge && gridCellFirstLarge,
                    gridCellBottomLarge && gridCellBottomLarge
                  )}
                  key={idx}
                >
                  {type === 'assets' ? (
                    <div className={clickable} onClick={() => lightbox.current.openItem(idx)}>
                      <AssetPreview hasLightbox {...project} featured image={project} />
                    </div>
                  ) : __typename === 'SanityStudent' ? (
                    <StudentPreview featured onClick={() => lightbox.current.openItem(idx)} {...project} />
                  ) : (
                    <ProjectPreview small onClick={() => lightbox.current.openItem(idx)} {...project} />
                  )}
                </li>
              );
            })}
        </ul>
      </div>
      {projects && <Lightbox ref={lightbox} media={projects} featured />}
    </>
  );
}

export default FeaturedProjectsGrid;
