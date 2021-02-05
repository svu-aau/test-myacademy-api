import React from 'react';
import styles from './industry-grid.module.css';
import typographyStyles from '../../styles/typography.module.css';
import { shuffle } from 'lodash';
import Img from 'gatsby-image';

const IndustryGrid = ({ hiringCompanies, limit = 4, children, shuffled = true }) => {
  if (!limit || limit < 1) limit = 999;
  const companies = [...(shuffled ? shuffle(hiringCompanies) : hiringCompanies)].splice(0, limit);
  return (
    <>
      {children || (
        <>
          <h1 className={typographyStyles.responsiveTitle1}>Professional Network</h1>
          <h2 className={typographyStyles.macro}>Companies that have hired our graduates</h2>
        </>
      )}
      <div className={styles.industryGrid}>
        {companies.map(
          ({ _id, logo }, idx) =>
            logo && (
              <div key={idx} className={styles.industryGridItem}>
                <Img fluid={logo.asset.fluid} alt={logo.alt} imgStyle={{ objectFit: 'contain' }} />
              </div>
            )
        )}
      </div>
    </>
  );
};

export default IndustryGrid;
