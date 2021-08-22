import React from 'react';
import { Link } from 'gatsby';
import { Carousel, Hero, Link as DLLink } from '@aauweb/design-library';

import { breadcrumb, breadcrumbLinkSeperator, columnSection, title } from '../layout/layout.module.css';
import Section from '../sections/section';
import Container from '../layout/container';

function StudentProfile(props) {
  const { name, school, portfolio } = props;

  const media = [...portfolio];

  // console.log('media', media);
  const carouselData = media.map((item) => {
    return {
      id: item._key,
      alt: item.alt,
      image: item.image.asset.fluid.src,
    };
  });

  return (
    <>
      <Hero backgroundImage={school.heroImage.asset.fluid.src} title={`School of ${props.school.title}`} />

      <Section alignReset noPaddingTop>
        <Container>
          <div className={breadcrumb}>
            <Link to={'/'}>HOME</Link>
            <span className={breadcrumbLinkSeperator}>&gt;</span>
            <Link to={`/schools/${school.slug.current}`}>{school.title}</Link>
            <span className={breadcrumbLinkSeperator}>&gt;</span>
            <div>{name}</div>
          </div>

          <h3>Midpoint Review</h3>
          <h2 className={title}>{name}</h2>

          <div className={columnSection}>
            <DLLink target="_blank" href="#" variant="cta" label="Download Thesis" />
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

export default StudentProfile;
