import React from 'react';
import { usePagination } from '@material-ui/lab/Pagination';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { cn } from '../lib/helpers';
import {
  ccmPaginationWrapper,
  next,
  pagination,
  paginationItem,
  paginationLink,
  prev,
  selectedStyle,
  disabledStyle,
} from './pagination.module.css';

const CustomPagination = ({ onChange, count }) => {
  const { items } = usePagination({
    count,
    onChange,
  });
  return (
    <nav className={ccmPaginationWrapper}>
      <ul className={pagination}>
        {items.map(({ page, type, selected, disabled, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            // console.log('ellipse');
          } else if (type === 'page') {
            children = (
              <a className={cn(paginationLink, selected && selectedStyle)} {...item}>
                {page}
              </a>
            );
          } else {
            children = (
              <a className={cn(paginationLink, disabled && disabledStyle, type === 'next' ? next : prev)} {...item}>
                {type === 'previous' && <KeyboardBackspaceIcon />}
                {type !== 'previous' && type !== 'next' && type}
                {type === 'next' && <ArrowRightAltIcon />}
              </a>
            );
          }

          return (
            <li className={paginationItem} key={index}>
              {children}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CustomPagination;
