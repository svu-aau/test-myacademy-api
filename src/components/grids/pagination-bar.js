import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import styles from './pagination-bar.module.css';

const useStyles = makeStyles(() => ({
  // HACK ALERT: the build would fail if
  // we used props and string templates for isDark below
  // so we are duplicating and hard coding isDark and isLight
  // as separate style classes to avoid string interpolation
  // so the build will succeed :(
  isDark: {
    padding: '2em 1em',
    '& ul > li': {
      '&:first-child, &:last-child': {
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 900,
        cursor: 'pointer',

        '& svg': {
          color: 'var(--color-black-bg)',
          fontSize: '2.25rem',
        },

        '&:hover': {
          backgroundColor: 'unset !important',
        },
      },
      '&:not(:first-child):not(:last-child) > button': {
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 900,
        fontSize: '1.5rem',
        padding: '20px 15px',
        border: '3px solid',
        borderColor: 'var(--color-black-bg)',
        color: 'var(--color-black-bg)',
        cursor: 'pointer',

        '&:hover': {
          backgroundColor: 'var(--color-black-bg)',
          border: `3px solid ${'var(--color-black-bg)'}`,
          color: 'var(--color-white)',
        },
        '&.Mui-selected': {
          backgroundColor: 'var(--color-black-bg)',
          border: `3px solid ${'var(--color-black-bg)'}`,
          color: 'var(--color-white) !important',
        },
      },
      '& .MuiPaginationItem-ellipsis': {
        marginRight: '35px',
        color: 'var(--color-black-bg)',
        cursor: 'default',
      },
    },
  },
  isLight: {
    padding: '2em 1em',
    '& ul > li': {
      '&:first-child, &:last-child': {
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 900,
        cursor: 'pointer',

        '& svg': {
          color: 'var(--color-white)',
          fontSize: '2.25rem',
        },

        '&:hover': {
          backgroundColor: 'unset !important',
        },
      },
      '&:not(:first-child):not(:last-child) > button': {
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 900,
        fontSize: '1.5rem',
        padding: '20px 15px',
        border: '3px solid',
        borderColor: 'var(--color-white)',
        color: 'var(--color-white)',
        cursor: 'pointer',

        '&:hover': {
          backgroundColor: 'var(--color-white)',
          border: '3px solid var(--color-white)',
          color: 'var(--color-black-bg)',
        },
        '&.Mui-selected': {
          backgroundColor: 'var(--color-white)',
          border: '3px solid var(--color-white)',
          color: 'var(--color-black-bg) !important',
        },
      },
      '& .MuiPaginationItem-ellipsis': {
        marginRight: '35px',
        color: 'var(--color-white)',
        cursor: 'default',
      },
    },
  },
}));

function PaginationBar({ pages = 1, handleClick, isDark = false }) {
  let [page, setPage] = useState(1);
  const paginationClasses = useStyles();

  function handleChangePage(event, num) {
    setPage(num);
    handleClick(num);
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Pagination
          count={pages}
          shape="rounded"
          defaultPage={page}
          boundaryCount={1}
          siblingCount={0}
          className={isDark ? paginationClasses.isDark : paginationClasses.isLight}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default PaginationBar;
