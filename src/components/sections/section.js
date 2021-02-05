import React from 'react';

import styles from './section.module.css';
import { cn } from '../../lib/helpers';

/**
 * Section is like a full width row that contains containers to center inside it
 */
const Section = ({ color = 'white', children, alignment, flush, flushSides }) => {
  const colorClass = color && styles[color];
  const colorStyles = !colorClass
    ? {
        backgroundColor: color,
        // use black text for white, peach, & neon green bg only
        color:
          color === 'white' || ['#82fde0', '#ffb5b6', '#f3ff6b'].includes(color)
            ? 'var(--color-black)'
            : 'var(--color-white)',
      }
    : {};
  return (
    <div
      style={colorStyles}
      className={cn(
        styles.root,
        colorClass,
        flush && styles.flush,
        flushSides && styles.flushSides,
        alignment === 'center' && styles.center
      )}
    >
      {children}
    </div>
  );
};

export default Section;
