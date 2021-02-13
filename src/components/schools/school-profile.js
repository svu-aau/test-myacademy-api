import Img from 'gatsby-image';
import React from 'react';

import { sortByTitle, sortByName } from '../../lib/helpers';
import BlockContent from '../block-content';
import ColumnGrid from '../grids/column-grid';
import ContactUs from '../sections/contact-us';
import Container from '../layout/container';
import IndustryGrid from '../sections/industry-grid';
import Section from '../sections/section';
import StudentsGrid from '../students/students-grid';
import styles from './school-profile.module.css';
import typographyStyles from '../../styles/typography.module.css';

function SchoolProfile(props) {
  const { _rawIntro, heroImage, title, students, projects, hiringCompanies, gallery, majors } = props;
  const isArchitecture = title.toLowerCase() === 'architecture';
  const isMasonryType = isArchitecture || title.toLowerCase() === 'photography';
  const galleryContent = gallery && gallery.content && gallery.content[0];

  let finalStudents = sortByName(students).map((student) => {
    const { portfolio } = student;
    let index = portfolio.findIndex(({ assetCategory }) => {
      if (assetCategory) {
        return assetCategory.title;
      } else {
        return null;
      }
    });
    let assetCategory = null;

    if (index >= 0) {
      assetCategory = portfolio[index].assetCategory.title;
    }

    student.assetCategory = assetCategory;
    return student;
  });

  return (
    <article className={styles.root}>
      {heroImage && heroImage.asset && (
        <div className={styles.mainImage}>
          <Img className={styles.hero} loading="eager" fluid={heroImage.asset.fluid} alt="Academy of Art University" />
          <h3 className={styles.heroTitle}>The School of</h3>
          <h1 className={styles.title}>{title}</h1>
        </div>
      )}
      {students && <StudentsGrid students={finalStudents} masonry={isMasonryType} filters={majors} school={title} />}
      {projects && projects.length > 0 && (
        <Section color="green" flushSides>
          <Container>
            {isArchitecture ? (
              <>
                <h1 className={typographyStyles.responsiveTitle1}>Student Projects</h1>
                <h2 className={typographyStyles.macro}>Thesis, Studio, and Collaborative</h2>
              </>
            ) : (
              <>
                <h1 className={typographyStyles.responsiveTitle1}>Collaborative Projects</h1>
                <h2 className={typographyStyles.macro}>Interdepartmental and Group Works</h2>
              </>
            )}
          </Container>
          <ColumnGrid items={sortByTitle(projects)} />
        </Section>
      )}
      {gallery && gallery.content && (
        <Section color={gallery.backgroundColor ? gallery.backgroundColor : 'lime'} flushSides>
          <Container>
            <h1 className={typographyStyles.responsiveTitle1}>Gallery</h1>
            {gallery.subTitle && <h2 className={typographyStyles.macro}>{gallery.subTitle}</h2>}
          </Container>
          <ColumnGrid linkOverride={galleryContent.linkOverride} items={galleryContent.media} type="assets" media />
        </Section>
      )}
      <Section color="dark" alignment="center">
        <Container narrower>
          <h1 className={typographyStyles.responsiveTitle1}>About School of {title}</h1>
          {_rawIntro && <BlockContent blocks={_rawIntro || []} />}
        </Container>
      </Section>
      <Section>
        <IndustryGrid hiringCompanies={hiringCompanies} />
      </Section>
      <ContactUs />
    </article>
  );
}

export default SchoolProfile;
