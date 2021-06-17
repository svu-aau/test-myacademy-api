import React, { useRef } from 'react';

import { cn } from '../../lib/helpers';
import AssetPreview from '../assets/asset-preview';
import Lightbox from '../lightbox';
import ProjectPreview from './project-preview';
import styles from './featured-projects-grid.module.css';
import StudentPreview from '../students/student-preview';

function FeaturedProjectsGrid({ projects, type }) {
  // console.log('FeaturedProjectsGrid projects', projects);
  // console.log('type: ', type);
  const totalProjects = projects && projects.length;
  const lightbox = useRef();

  return (
    <>
      <div className={styles.root}>
        <ul className={styles.grid}>
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
                    styles.gridCell,
                    gridCellSecondLarge && styles.gridCellSecondLarge,
                    gridCellFirstLarge && styles.gridCellFirstLarge,
                    gridCellBottomLarge && styles.gridCellBottomLarge
                  )}
                  key={idx}
                >
                  {type === 'assets' ? (
                    <div className={styles.clickable} onClick={() => lightbox.current.openItem(idx)}>
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
