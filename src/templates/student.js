import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/layout/container';
import GraphQLErrorList from '../components/graphql-error-list';
import ProjectProfile from '../components/projects/project-profile';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';

export const query = graphql`
  query StudentTemplateQuery($id: String!) {
    student: sanityStudent(id: { eq: $id }) {
      ...Student
    }
    page: sanityPage(slug: { current: { eq: "home" } }) {
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
    }
  }
`;

const StudentTemplate = (props) => {
  const { data, errors } = props;
  const student = data && data.student;
  const { page } = data;
  const project = student.projects[0] || null;

  return (
    <Layout fixedNav>
      {errors && <SEO title="GraphQL Error" />}
      {student && (
        <SEO
          title={student.name || 'Untitled'}
          seoImage={page.seoImage?.image?.asset.img.src}
          path={props.location.pathname}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {project && <ProjectProfile {...project} />}
    </Layout>
  );
};

export default StudentTemplate;
