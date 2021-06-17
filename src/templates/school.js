import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/layout/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SchoolProfile from '../components/schools/school-profile';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';

export const query = graphql`
  query SchoolTemplateQuery($id: String!) {
    school: sanitySchool(id: { eq: $id }) {
      ...School
      seoImage {
        asset {
          _id
          url
          img: fixed(width: 1024) {
            width
            height
            src
          }
        }
      }
      seoKeywords
      seo {
        focus_keyword
        meta_description
        seo_title
      }
      gallery {
        ...GlobalSection
      }
      majors {
        title
      }
    }
    students: allSanityStudent(
      filter: {
        school: { id: { eq: $id } }
        slug: { current: { ne: null } }
        hiddenProfile: { ne: true }
        publishedAt: { ne: null }
      }
    ) {
      nodes {
        ...StudentPreview
      }
    }
    projects: allSanityProject(
      filter: { school: { id: { eq: $id } }, slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      nodes {
        ...ProjectPreview
      }
    }
  }
`;

const SchoolTemplate = (props) => {
  const { data, errors } = props;
  // console.log('school data: ', data);
  const school = data && data.school;

  const { seo, seoImage } = school;
  const seoDescription = (seo && seo.meta_description) || '';
  const pageTitle = school.title || 'Untitled';
  const seoTitle = (seo && seo.seo_title) || pageTitle;

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
          seoImage={seoImage?.asset?.img?.src}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {school && (
        <SchoolProfile
          {...school}
          students={data.students.nodes}
          projects={data.projects.nodes}
          hiringCompanies={data.school.hiringCompanies}
          gameDemos={data.school.gameDemos}
        />
      )}
    </Layout>
  );
};

export default SchoolTemplate;
