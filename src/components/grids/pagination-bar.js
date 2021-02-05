import React, { useState } from 'react';

import styles from './pagination-bar.module.css';
import { cn } from '../../lib/helpers';

function PaginationBar({ pages, handleClick }) {
  let [page, setPage] = useState(1);

  function onClick(num) {
    setPage(num);
    handleClick(num);
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {pages.map((num) => {
          if (num === page) {
            return (
              <div
                key={num}
                className={cn(styles.paginationItem, styles.paginationItemActive)}
                onClick={() => onClick(num)}
              >
                {num}
              </div>
            );
          }

          return (
            <div key={num} className={styles.paginationItem} onClick={() => onClick(num)}>
              {num}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaginationBar;
