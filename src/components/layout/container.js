import React from 'react';

import styles from './container.module.css';
import { cn } from '../../lib/helpers';

const Container = ({ color, children, narrow, narrower }) => {
  return (
    <div
      className={cn(styles.root, color === 'dark' && styles.dark, narrow && styles.narrow, narrower && styles.narrower)}
    >
      {children}
    </div>
  );
};

export default Container;
