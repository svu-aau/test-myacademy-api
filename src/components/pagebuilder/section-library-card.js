import React from 'react';

import { CardGrid } from '@aauweb/design-library';
import BlockContent from '../block-content';
import styles from './section-library-card.module.css';

const SectionLibraryCard = ({ section }) => {
  const { heroImage, _rawCaption, href, title } = section;

  const data = [
    {
      alt: heroImage.alt,
      buttonText: 'Learn More',
      children: <BlockContent blocks={_rawCaption} />,
      href,
      image: heroImage.asset.fluid.src,
      title,
    },
  ];

  return (
    <div className={styles.root} key={section._key} /*color={backgroundColor}*/ alignment="center">
      <CardGrid data={data} />
    </div>
  );
};

export default SectionLibraryCard;
