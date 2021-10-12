import React from 'react';
import { graphql } from 'gatsby';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import ContentSections from '../components/pagebuilder/content-sections';

export const query = graphql`
  query IndexPageQuery {
    gatsby: site {
      config: siteMetadata {
        siteUrl
        title
        description
        userTwitter
      }
    }
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    page: sanityPage(slug: { current: { eq: "home" } }) {
      content: contentArray {
        ...PageContent
      }
      title
      seoImage {
        asset {
          ... on SanityImageAsset {
            _id
            url
            gatsbyImageData(layout: FIXED, width: 1024)
          }
        }
      }
      seoKeywords
      seo {
        focus_keyword
        meta_description
        seo_title
      }
    }
  }
`;

// check if window object exists (to avoid vercel deploy error)
// https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
const isWindowExists = () => {
  return typeof window !== 'undefined';
};

// get query string param if it exists
// https://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
const getQueryVariable = (variable) => {
  if (isWindowExists()) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    return false;
  } else {
    return false;
  }
};

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const {
    gatsby: { config },
    site,
    page,
  } = data;

  // console.log('page: ', page);

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout
      headerBackgroundImage={data.headerBackgroundImage ? data.headerBackgroundImage : data.backgroundImageFallback}
    >
      <SEO
        title={page.seo.seo_title || site.title || config.title}
        description={page.seo.meta_description}
        keywords={page.seoKeywords || site.keywords}
        seoImage={page.seoImage?.asset?.img?.src}
        path={props.location.pathname}
      />
      {page && <ContentSections content={page.content} slug={'home'} />}
    </Layout>
  );
};

export default IndexPage;
