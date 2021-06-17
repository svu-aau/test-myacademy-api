import React from 'react';
import Container from '../components/layout/container';
import Section from '../components/sections/section';
import GraphQLErrorList from '../components/graphql-error-list';
import StudentIndexGrid from '../components/students/student-index-grid';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import typographyStyles from '../styles/typography.module.css';
import { graphql } from 'gatsby';
import { mapEdgesToNodes, sortByTitle } from '../lib/helpers';

export const query = graphql`
  query AllStudentsPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    headerBackgroundImage: file(relativePath: { eq: "2_Illustrative_20Site_20Plan_20v2.jpeg" }) {
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
    students: allSanityStudent(filter: { hiddenProfile: { ne: true } }) {
      nodes {
        ...StudentPreview
      }
    }
  }
`;

const StudentTemplate = (props) => {
  const { data, errors } = props;
  const site = (data || {}).site;

  return (
    <Layout
      siteSubtitle="Artist Directory"
      siteTitle="Academy of Art University"
      heroImageCaption="Taylor Broussard / Landscape Architecture"
      headerBackgroundImage={data.headerBackgroundImage ? data.headerBackgroundImage : data.backgroundImageFallback}
    >
      <SEO
        title="Artist Directory"
        description="Find talented artists and designers by the school. Click artists' names to see their work and portfolios."
        keywords={site.keywords}
      />
      {errors && <SEO title="GraphQL Error" path={props.location.pathname} />}
      {data.students && (
        <Section color="black">
          <StudentIndexGrid students={data.students.nodes} schools={data.schools.nodes} />
        </Section>
      )}
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
    </Layout>
  );
};

export default StudentTemplate;
