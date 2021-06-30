import React from 'react';

import styles from './section.module.css';
import { cn } from '../../lib/helpers';

// cms saves only the hex values so we gotta map back to our css var color names
const colorsToClasses = {
  '#FFD042': 'yellow',
  '#82fde0': 'neonGreen',
  '#2d373f': 'darkGreen',
  '#3c51b0': 'violet',
  '#ffb5b6': 'peach',
  '#f3ff6b': 'lime',
  '#003049': 'deepBlue',
  '#AC2020': 'brickRed',
  '#F3889C': 'pink',
  '#F77F00': 'orange',
  '#4A08BC': 'purple',
  '#292931': 'dark',
  '#0f131a': 'black',
};

/**
 * Section is like a full width row that contains containers to center inside it
 */

const Section = ({
  color = 'white',
  children,
  alignment,
  flush,
  flushSides,
  globe,
  isPageContent = false,
  id = null,
  noPaddingTop,
  alignReset,
}) => {
  // prefer classes if they exist
  const colorClass = colorsToClasses[color] || color;
  const colorStyles = !colorClass
    ? {
        backgroundColor: color,
        // use black text for specific colors if no class set
        color:
          color === 'white' || ['#82fde0', '#ffb5b6', '#f3ff6b', '#FFD042', '#F77F00'].includes(color)
            ? 'var(--color-black)'
            : 'var(--color-white)',
      }
    : {};
  return (
    <div
      style={colorStyles}
      className={cn(
        styles.root,
        isPageContent && styles.isPageContent,
        styles[colorClass],
        flush && styles.flush,
        flushSides && styles.flushSides,
        alignment === 'center' && styles.center,
        globe && styles.globe,
        alignReset && styles.alignReset,
        noPaddingTop && styles.noPaddingTop
      )}
      id={id}
    >
      {children}
    </div>
  );
};

export default Section;
