import React from 'react';
import { graphql, Link } from 'gatsby';
import { ImageGrid } from '@aauweb/design-library';

import Container from '../components/layout/container';
import Section from '../components/sections/section';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import layoutStyles from '../components/layout/layout.module.css';

export const query = graphql`
  query AllSchoolsPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    schools: allSanitySchool {
      nodes {
        ...SchoolPreview
      }
    }
  }
`;

const ProjectTemplate = (props) => {
  // console.log('ProjectTemplate props: ', props);
  const { data, errors } = props;
  const { schools } = data;
  const site = (data || {}).site;

  let schoolDataArray = null;

  console.log('schools', schools);

  if (schools) {
    schoolDataArray = schools.nodes.map(({ heroImage, title, slug }) => [
      heroImage.asset.fluid.src,
      [title, `/schools/${slug.current}`],
    ]);
  }

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

      <Section alignReset noPaddingBottom>
        <Container>
          <div className={layoutStyles.breadcrumb}>
            <Link to={'/'}>HOME</Link>
            <span className={layoutStyles.breadcrumbLinkSeperator}>&gt;</span>
            <Link to="/schools">Schools</Link>
          </div>
        </Container>
      </Section>

      {schools && (
        <Section noPaddingTop>
          <Container>
            <h1>Schools</h1>
            <ImageGrid data={schoolDataArray} />
          </Container>
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

export default ProjectTemplate;
