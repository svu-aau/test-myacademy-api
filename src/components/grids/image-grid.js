import React from 'react';
import ColumnGrid from '../grids/column-grid';

import styles from '../projects/projects-grid.module.css';

function ImageGrid({ items, linkOverride, showFilters = false, showPagination = false }) {
  //todo: wire up filters and pagination
  return (
    <div className={styles.root}>
      <ColumnGrid linkOverride={linkOverride} items={items} type="assets" />
    </div>
  );
}

export default ImageGrid;
