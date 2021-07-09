import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/layout/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import ContentSections from '../components/pagebuilder/content-sections';
import SiteMap from '../components/pagebuilder/site-map';

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
    path,
    errors,
  } = props;

  const { title, content, seo, seoImage, slug } = page;
  const seoDescription = (seo && seo.meta_description) || '';
  const pageTitle = title || 'Untitled';
  const seoTitle = (seo && seo.seo_title) || pageTitle;
  const pageUrl = siteUrl + '/' + slug?.current;

  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {page && (
        <SEO
          title={pageTitle}
          seoImage={seoImage?.asset?.img?.src}
          seoTitle={seoTitle}
          description={seoDescription}
          keywords={page.seoKeywords}
          path={props.location.pathname}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {content && <ContentSections isPageContent content={content} />}
      {path === '/site-map/' && <SiteMap />}
    </Layout>
  );
};

export default ProjectTemplate;
