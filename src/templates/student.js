import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/layout/container';
import GraphQLErrorList from '../components/graphql-error-list';
import StudentProfile from '../components/students/student-profile';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';

export const query = graphql`
  query StudentTemplateQuery($id: String!) {
    studentProfile: sanityStudent(id: { eq: $id }) {
      ...Student
      seoImage: heroImage {
        ... on SanityFigure {
          image {
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
        }
      }
    }
    collabProjects: allSanityProject(filter: { members: { elemMatch: { person: { id: { eq: $id } } } } }) {
      nodes {
        ...Project
      }
    }
  }
`;

const StudentTemplate = ({ data: { studentProfile, collabProjects }, errors, location }) => {
  return (
    <Layout fixedNav>
      {errors && <SEO title="GraphQL Error" />}
      {studentProfile && (
        <SEO
          title={studentProfile.name || 'Untitled'}
          path={location.pathname}
          seoImage={studentProfile.seoImage[0]?.image?.asset.img.src}
          description={`Explore the work of ${studentProfile.school.title} student, ${studentProfile.name}`}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {studentProfile && <StudentProfile collabProjects={collabProjects.nodes} {...studentProfile} />}
    </Layout>
  );
};

export default StudentTemplate;
