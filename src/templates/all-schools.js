import React from 'react';
import { graphql, Link, navigate } from 'gatsby';
import { ImageGrid } from '@aauweb/design-library';

import Container from '../components/layout/container';
import Section from '../components/sections/section';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import { breadcrumb, breadcrumbLinkSeperator } from '../components/layout/layout.module.css';
import { urlFor } from '../utils/tools';

export const query = graphql`
  query AllSchoolsPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    schools: allSanitySchool(sort: { fields: title, order: ASC }) {
      nodes {
        ...SchoolPreview
      }
    }
  }
`;

const ProjectTemplate = (props) => {
  const { data, errors } = props;
  const { schools } = data;
  const site = (data || {}).site;

  let schoolDataArray = null;

  // console.log('schools', schools);

  if (schools) {
    schoolDataArray = schools.nodes.map(({ heroImage, title, slug }) => [
      heroImage ? urlFor(heroImage.asset?.url).width(300).auto('format').fit('max').url() : null,
      [title, `/schools/${slug.current}`],
    ]);
  }

  return (
    <Layout
      siteSubtitle="Schools"
      siteTitle="Academy of Art University"
      heroImageCaption="Yi Hsien Rachel Wang / Architecture"
      headerBackgroundImage={data.headerBackgroundImage ? data.headerBackgroundImage : data.backgroundImageFallback}
    >
      <SEO
        title="Schools"
        description="Explore interdisciplinary design projects bring students from diverse programs at the Academy together to work on real-world projects."
        keywords={site.keywords}
      />
      {errors && <SEO title="GraphQL Error" path={props.location.pathname} />}

      <Section alignReset noPaddingBottom>
        <Container>
          <div className={breadcrumb}>
            <Link to={'/'}>HOME</Link>
            <span className={breadcrumbLinkSeperator}>&gt;</span>
            <span>Schools</span>
          </div>
        </Container>
      </Section>

      {schools && (
        <Section noPaddingTop>
          <Container>
            <h1>Schools</h1>
            <ImageGrid data={schoolDataArray} onClick={(link) => navigate(link)} />
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
