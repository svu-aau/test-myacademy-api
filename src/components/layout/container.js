import React from 'react';

import { root, narrower as narrowerCss, narrow as narrowCss, dark, split as splitCss } from './container.module.css';
import { cn } from '../../lib/helpers';

const Container = ({ color, children, narrow, narrower, split, id }) => {
  return (
    <div
      id={id}
      className={cn(root, color === 'dark' && dark, narrow && narrowCss, narrower && narrowerCss, split && splitCss)}
    >
      {children}
    </div>
  );
};

export default Container;
