import React from 'react';

import { root, narrower, narrow, dark, split } from './container.module.css';
import { cn } from '../../lib/helpers';

const Container = ({ color, children, narrow, narrower, split }) => {
  return (
    <div className={cn(root, color === 'dark' && dark, narrow && narrow, narrower && narrower, split && split)}>
      {children}
    </div>
  );
};

export default Container;
