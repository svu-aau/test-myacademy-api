import React from 'react';
import Container from '../components/layout/container';
import Section from '../components/sections/section';
import GraphQLErrorList from '../components/graphql-error-list';
import ProjectsGrid from '../components/projects/projects-grid';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import typographyStyles from '../styles/typography.module.css';
import { graphql } from 'gatsby';
import IndustryGrid from '../components/sections/industry-grid';
import { mapEdgesToNodes, sortByTitle } from '../lib/helpers';

export const query = graphql`
  query AllProjectsPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    headerBackgroundImage: file(
      relativePath: { eq: "001-ARH-M-Arch-Thesis-3840px--Yi-Hsien-Rachel-Wang---Model-Top-View.jpeg" }
    ) {
      childImageSharp {
        fluid(maxHeight: 815, maxWidth: 1169, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    schools: allSanitySchool {
      nodes {
        ...SchoolPreview
      }
    }
    hiringCompanies: allSanityHiringCompany {
      nodes {
        ...HiringCompanies
      }
    }
    projects: allSanityProject {
      edges {
        node {
          ...ProjectPreview
        }
      }
    }
  }
`;

const ProjectTemplate = (props) => {
  // console.log('ProjectTemplate props: ', props);
  const { data, errors } = props;
  const site = (data || {}).site;
  return (
    <Layout
      siteSubtitle="Collaborative Projects"
      siteTitle="Academy of Art University"
      heroImageCaption="Yi Hsien Rachel Wang / Architecture"
      headerBackgroundImage={data.headerBackgroundImage ? data.headerBackgroundImage : data.backgroundImageFallback}
    >
      <SEO
        title="Collaborative Projects"
        description="Explore interdisciplinary design projects bring students from diverse programs at the Academy together to work on real-world projects."
        keywords={site.keywords}
      />
      {errors && <SEO title="GraphQL Error" path={props.location.pathname} />}
      {data.projects && (
        <Section color="black" flush>
          <ProjectsGrid showFilters showPagination projects={sortByTitle(mapEdgesToNodes(data.projects))} />
        </Section>
      )}
      <Section color="dark" alignment="center">
        <Container narrower>
          <h1 className={typographyStyles.responsiveTitle1}>About the Projects</h1>
          <p className={typographyStyles.paragraph}>
            At any given moment, dozens of collaborations are happening at the Academy. From corporate-sponsored courses
            with companies like Pixar, NASA, and General Motors, to small study groups meeting up to practice drawing,
            to an online group of students from different countries designing better headphones.
          </p>
          <p className={typographyStyles.paragraph}>
            In each case, students learn to empathize with others, collaborate across disciplines, solve problems
            creatively, adapt to changing circumstances, and persist in the face of obstacles. These skills help prepare
            students to thrive in their future professions.
          </p>
        </Container>
      </Section>
      <Section>
        <IndustryGrid hiringCompanies={data.hiringCompanies.nodes} limit="8" />
      </Section>
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
    </Layout>
  );
};

export default ProjectTemplate;
