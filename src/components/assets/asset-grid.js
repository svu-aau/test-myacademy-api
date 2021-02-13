import React from 'react';
import ColumnGrid from '../grids/column-grid';
import styles from '../projects/projects-grid.module.css';
import FilterBar from '../grids/filter-bar';
import PaginationBar from '../grids/pagination-bar';

function AssetGrid({ project, showFilters = false, showPagination = false }) {
  // console.log('AssetGrid project', project);
  //todo: wire up filters and pagination
  return (
    <div className={styles.root}>
      {showFilters && <FilterBar />}
      <ColumnGrid items={projects} type="assets" />
      {showPagination && <PaginationBar />}
    </div>
  );
}

export default AssetGrid;
