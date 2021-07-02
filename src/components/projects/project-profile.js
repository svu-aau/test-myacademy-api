import React from 'react';
import { Link } from 'gatsby';
import { Carousel, Hero, Link as DLLink } from '@aauweb/design-library';

import layoutStyles from '../layout/layout.module.css';
import Section from '../sections/section';
import Container from '../layout/container';

function ProjectProfile(props) {
  const { title, student, school, gallery } = props;

  console.log('gallery', gallery);
  const carouselData = gallery.map((item) => ({
    id: item._key,
    image: item.asset.fluid.src,
  }));

  return (
    <>
      {school.heroImage && (
        <Hero backgroundImage={school.heroImage.asset.fluid.src} title={`School of ${props.school.title}`} />
      )}

      <Section alignReset noPaddingTop={!!school.heroImage}>
        <Container>
          <div className={layoutStyles.breadcrumb}>
            <Link to={'/'}>HOME</Link>
            <span className={layoutStyles.breadcrumbLinkSeperator}>&gt;</span>
            <Link to={`/schools/${school.slug.current}`}>{school.title}</Link>
            <span className={layoutStyles.breadcrumbLinkSeperator}>&gt;</span>
            <div className={layoutStyles.breadcrumbLink}>{student}</div>
          </div>

          <h3>{title}</h3>
          <h2 className={layoutStyles.title}>{student}</h2>

          <div className={layoutStyles.columnSection}>
            <DLLink link="#" variant="cta" label="Download Thesis" />
          </div>

          <br />
          <br />
          <br />
          <Carousel data={carouselData} />
        </Container>
      </Section>
    </>
  );
}

export default ProjectProfile;
