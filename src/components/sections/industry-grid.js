import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { heading, industryGrid, industryGridItem } from './industry-grid.module.css';
import { responsiveTitle1 } from '../../styles/typography.module.css';
import { sortByName, cn } from '../../lib/helpers';
import { GatsbyImage } from 'gatsby-plugin-image';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const IndustryGrid = ({ sortAlpha, hiringCompanies, limit = 4, children, slug }) => {
  if (!limit || limit < 1) limit = 999;
  const companies = [...(sortAlpha ? sortByName(hiringCompanies) : hiringCompanies)].splice(0, limit);

  return (
    <>
      {children || (
        <>
          <h1 className={cn(responsiveTitle1, heading)}>Companies That Have Hired Our Graduates</h1>
        </>
      )}
      {slug && slug === 'home' ? (
        <Carousel
          responsive={responsive}
          ssr={false}
          infinite={true}
          arrows={false}
          autoPlay={true}
          autoPlaySpeed={1200}
          transitionDuration={1000}
        >
          {companies.map(
            ({ _id, logo }, idx) =>
              logo && (
                <div key={idx} className={industryGridItem}>
                  <GatsbyImage
                    image={logo.childImageSharp.gatsbyImageData}
                    alt={logo.alt}
                    imgStyle={{ objectFit: 'contain' }}
                  />
                </div>
              )
          )}
        </Carousel>
      ) : (
        <div className={industryGrid}>
          {companies.map(
            ({ _id, logo }, idx) =>
              logo && (
                <div key={idx} className={industryGridItem}>
                  <GatsbyImage
                    image={logo.childImageSharp.gatsbyImageData}
                    alt={logo.alt}
                    imgStyle={{ objectFit: 'contain' }}
                  />
                </div>
              )
          )}
        </div>
      )}
    </>
  );
};

export default IndustryGrid;
