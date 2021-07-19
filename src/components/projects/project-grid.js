import { Link } from 'gatsby';
import React from 'react';
import ColumnGrid from '../grids/column-grid';

import styles from './projects-grid.module.css';
import FilterBar from '../grids/filter-bar';
import PaginationBar from '../grids/pagination-bar';

function ProjectGrid({ projects, linkOverride, showFilters = false, showPagination = false }) {
  //todo: wire up filters and pagination
  return (
    <div className={styles.root}>
      {showFilters && <FilterBar />}
      <ColumnGrid linkOverride={linkOverride} items={projects} type="assets" />
      {showPagination && <PaginationBar />}
    </div>
  );
}

export default ProjectGrid;
