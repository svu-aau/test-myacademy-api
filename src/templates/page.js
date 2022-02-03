import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/layout/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import ContentSections from '../components/pagebuilder/content-sections';

export const query = graphql`
  query PageTemplateQuery($id: String!) {
    site {
      meta: siteMetadata {
        siteUrl
      }
    }
    page: sanityPage(id: { eq: $id }) {
      id
      slug {
        current
      }
      title
      seoImage {
        asset {
          ... on SanityImageAsset {
            _id
            url
            gatsbyImageData(layout: FIXED, width: 1024, height: 630)
          }
        }
      }
      seoKeywords
      seo {
        focus_keyword
        meta_description
        seo_title
      }
      content: contentArray {
        ...PageContent
      }
    }
  }
`;

const ProjectTemplate = (props) => {
  const {
    data: {
      site: {
        meta: { siteUrl },
      },
      page,
    },
    location,
    errors,
  } = props;

  const { title, content, seo, seoImage, slug } = page;
  const seoDescription = (seo && seo.meta_description) || '';
  const pageTitle = title || 'Untitled';
  const seoTitle = (seo && seo.seo_title) || pageTitle;
  const pageUrl = siteUrl + '/' + slug?.current;
  return (
    <Layout location={location}>
      {errors && <SEO title="GraphQL Error" />}
      {page && (
        <SEO
          title={pageTitle}
          seoImage={seoImage?.asset?.gatsbyImageData}
          seoTitle={seoTitle}
          description={seoDescription}
          keywords={page.seoKeywords}
          path={location.pathname}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {content?.length && <ContentSections isPageContent content={content} />}
    </Layout>
  );
};

export default ProjectTemplate;
