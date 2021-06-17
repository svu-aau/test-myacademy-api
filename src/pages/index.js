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
  } else if (isWindowExists() && window.location.search) {
    // - handle redirects with query string since vercel redirect mechanism (vercel.json) can't handle query string
    // - implemented in conjuction with /vercel.json: https://vercel.com/docs/configuration?query=redirects#project/redirects
    // - vercel reidrects can't handle query string and thus query strings must be handled in code here
    const department = getQueryVariable('department');
    if (department) {
      if (department.match(/Animation/)) {
        window.location.replace('/schools/animation-and-visual-effects/');
      } else if (department.match(/Industrial/)) {
        window.location.replace('/schools/industrial-design');
      }
    }
  }

  const {
    gatsby: { config },
    site,
    page,
  } = data;

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
