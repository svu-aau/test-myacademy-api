import React from 'react';
import { graphql, Link } from 'gatsby';

import SectionLibraryHero from '../components/pagebuilder/section-library-hero';
import SectionCard from '../components/pagebuilder/section-card';
import Container from '../components/layout/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import Section from '../components/sections/section';
import { breadcrumbLinkSeperator, breadcrumb } from '../components/layout/layout.module.css';

export const query = graphql`
  query SchoolTemplateQuery($id: String!) {
    school: sanitySchool(id: { eq: $id }) {
      ...School
      seoImage {
        asset {
          ... on SanityImageAsset {
            _id
            url
            gatsbyImageData(layout: FIXED, width: 1024)
          }
        }
      }
      seoKeywords
      seo {
        focus_keyword
        meta_description
        seo_title
      }
    }
  }
`;

const SchoolTemplate = (props) => {
  const { data, errors } = props;
  const school = data && data.school;

  const { title, heroImage, heroTitle, columnData, slug, seo, seoImage } = school;
  const seoDescription = (seo && seo.meta_description) || '';
  const pageTitle = school.title || 'Untitled';
  const seoTitle = (seo && seo.seo_title) || pageTitle;

  console.log('school', school);

  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {school && (
        <SEO
          title={school.title || 'Untitled'}
          seoTitle={seoTitle}
          description={seoDescription}
          keywords={school.seoKeywords}
          path={props.location.pathname}
          seoImage={seoImage?.asset?.gatsbyImageData}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {heroImage && <SectionLibraryHero section={{ backgroundImage: heroImage, heroTitle: `School of ${title}` }} />}

      <Section alignReset noPadding={heroImage} noPaddingBottom={!heroImage}>
        <Container>
          <div className={breadcrumb}>
            <Link to={'/'}>HOME</Link>
            <span className={breadcrumbLinkSeperator}>&gt;</span>
            <Link to={'/schools'}>Schools</Link>
            <span className={breadcrumbLinkSeperator}>&gt;</span>
            <span>{school.title}</span>
          </div>
        </Container>
      </Section>

      {columnData && <SectionCard section={columnData} noPadding />}
    </Layout>
  );
};

export default SchoolTemplate;
