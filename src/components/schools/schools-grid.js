import React from 'react';
import SchoolPreview from './school-preview';

import { root, grid } from './schools-grid.module.css';

function SchoolsGrid({ schools }) {
  return (
    <div className={root}>
      <ul className={grid}>
        {schools &&
          schools.map((school) => (
            <li key={school.id}>
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
