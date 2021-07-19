import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/layout/container';
import GraphQLErrorList from '../components/graphql-error-list';
import ProjectProfile from '../components/projects/project-profile';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    project: sanityProject(id: { eq: $id }) {
      ...Project
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

const ProjectTemplate = (props) => {
  const { data, errors } = props;
  const project = data && data.project;
  const { page } = data;
  return (
    <Layout fixedNav>
      {errors && <SEO title="GraphQL Error" />}
      {project && (
        <SEO
          title={project.title || 'Untitled'}
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

export default ProjectTemplate;
