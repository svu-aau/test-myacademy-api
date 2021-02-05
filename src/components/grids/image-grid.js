import { Link } from 'gatsby';
import React from 'react';
import ColumnGrid from '../grids/column-grid';

import styles from '../projects/projects-grid.module.css';
import FilterBar from '../grids/filter-bar';
import PaginationBar from '../grids/pagination-bar';

function ImageGrid({ items, linkOverride, showFilters = false, showPagination = false }) {
  // console.log('ImageGrid items: ', items);
  //todo: wire up filters and pagination
  return (
    <div className={styles.root}>
      <ColumnGrid linkOverride={linkOverride} items={items} type="assets" />
    </div>
  );
}

export default ImageGrid;
