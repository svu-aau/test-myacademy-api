import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/layout/container';
import GraphQLErrorList from '../components/graphql-error-list';
import ProjectProfile from '../components/projects/project-profile';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    student: sanityStudent(_id: { eq: $id }) {
      ...Student
    }
    page: sanityPage(slug: { current: { eq: "home" } }) {
      seoImage {
        asset {
          ... on SanityImageAsset {
            _id
            url
            gatsbyImageData(layout: FIXED, width: 1024)
          }
        }
      }
    }
  }
`;

const ProjectTemplate = (props) => {
  const { data, errors } = props;
  const projects = data?.student?.projects;
  const { page } = data;
  return (
    <Layout fixedNav>
      {errors && <SEO title="GraphQL Error" />}
      {data?.student && (
        <SEO
          title={data?.student?.name || 'Untitled'}
          seoImage={page?.seoImage?.asset?.gatsbyImageData}
          path={props.location.pathname}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {projects?.length && projects.map((project) => <ProjectProfile key={project._id} {...data.student} />)}
    </Layout>
  );
};

export default ProjectTemplate;
