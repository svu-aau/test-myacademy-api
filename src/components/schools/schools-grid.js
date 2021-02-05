import { Link } from 'gatsby';
import React from 'react';
import SchoolPreview from './school-preview';

import styles from './schools-grid.module.css';

function SchoolsGrid({ schools }) {
  return (
    <div className={styles.root}>
      <ul className={styles.grid}>
        {schools &&
          schools.map((school) => (
            <li className={styles.gridCell} key={school.id}>
              <SchoolPreview {...school} />
            </li>
          ))}
      </ul>
    </div>
  );
}

SchoolsGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: '',
};

export default SchoolsGrid;
