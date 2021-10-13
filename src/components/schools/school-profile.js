import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

import { sortByTitle, sortByName } from '../../lib/helpers';
import BlockContent from '../block-content';
import ColumnGrid from '../grids/column-grid';
import ContactUs from '../sections/contact-us';
import Container from '../layout/container';
import IndustryGrid from '../sections/industry-grid';
import Section from '../sections/section';
import StudentsGrid from '../students/students-grid';
import { root, mainImage, hero, heroTitle, demosCTA } from './school-profile.module.css';
import typographyStyles from '../../styles/typography.module.css';
import serializerStyles from '../../components/serializers.module.css';
import { Link } from 'gatsby';

function SchoolProfile(props) {
  const { _rawIntro, heroImageCaption, heroImage, title, students, projects, hiringCompanies, gallery, majors } = props;

  const schoolTitle = title.toLowerCase();
  const isArchitecture = schoolTitle === 'architecture';
  const isMasonryType = schoolTitle === 'photography';
  const isGameDevelopment = schoolTitle === 'game development';

  const galleryContent = gallery && gallery.content && gallery.content[0];

  // todo: move this to page builder sections when we wire up these 'special' pages to the cms
  let galleryLink = null;
  if (galleryContent) {
    const { current: slug } = gallery.slug;
    switch (slug) {
      case 'school-of-photography-gallery':
        galleryLink = '/school-of-photography-gallery';
        break;
      case 'school-of-illustration-gallery':
        galleryLink = '/school-of-illustration-gallery';
        break;
      case 'school-of-game-development-gallery':
        galleryLink = '/school-of-game-development-gallery';
        break;
      case 'school-of-jewelry-and-metal-arts-gallery':
        galleryLink = '/school-of-jewelry-and-metal-arts-gallery';
        break;
      case 'school-of-fine-art-gallery':
        galleryLink = '/fine-art-gallery';
        break;
      default:
        break;
    }
  }

  /*
   * Loop through each student's Hero Image AND Portfolio media(s)
   * to store his/her unique asset categories
   */
  let finalStudents = sortByName(students).map((student) => {
    const { portfolio, heroImage } = student;

    // Portfolio(s)
    let assetCategories = portfolio.reduce((acc, { assetCategory }) => {
      assetCategory?.title && !acc.includes(assetCategory.title) && acc.push(assetCategory.title);
      return acc;
    }, []);

    // Hero Image(s)
    assetCategories = assetCategories.concat(
      heroImage.reduce((acc, { assetCategory }) => {
        assetCategory?.title && !acc.includes(assetCategory.title) && acc.push(assetCategory.title);
        return acc;
      }, [])
    );

    student.assetCategories = assetCategories;
    return student;
  });

  return (
    <article className={root}>
      {heroImage && heroImage.asset && (
        <div className={mainImage}>
          <GatsbyImage
            image={heroImage.childImageSharp.gatsbyImageData}
            className={hero}
            loading="eager"
            alt="Academy of Art University"
          />
          <h3 className={heroTitle}>The School of</h3>
          <h1 className={title}>{title}</h1>
          {heroImageCaption && <figcaption className={heroImageCaption}>{heroImageCaption}</figcaption>}
        </div>
      )}
      <Section color="dark" alignment="center">
        <Container narrower>
          <h1 className={typographyStyles.responsiveTitle1}>
            About {isGameDevelopment ? 'the' : ''} School of {title}
          </h1>
          {_rawIntro && <BlockContent blocks={_rawIntro || []} />}
          {isGameDevelopment && (
            <a className={demosCTA} href="#demos" title="Play Game Demos">
              Play Game Demos
            </a>
          )}
        </Container>
      </Section>
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
          <ColumnGrid items={sortByTitle(projects)} isMasonry={!isArchitecture} />
        </Section>
      )}
      {gallery && gallery.content && (
        <Section color={gallery.backgroundColor ? gallery.backgroundColor : 'lime'} flushSides>
          <Container>
            <h1 className={typographyStyles.responsiveTitle1}>Gallery</h1>
            {gallery.subTitle && <h2 className={typographyStyles.macro}>{gallery.subTitle}</h2>}
          </Container>
          <ColumnGrid linkOverride={galleryContent.linkOverride} items={galleryContent.media} type="assets" media />
          {galleryLink && (
            <div style={{ marginTop: '4em' }}>
              <Link to={galleryLink} className={serializerStyles.button}>
                View All
              </Link>
            </div>
          )}
        </Section>
      )}
      {hiringCompanies && hiringCompanies.length > 0 && (
        <Section>
          <IndustryGrid limit={999} hiringCompanies={hiringCompanies} />
        </Section>
      )}
      <ContactUs />
    </article>
  );
}

export default SchoolProfile;
