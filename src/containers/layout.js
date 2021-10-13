import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Layout from '../components/layout/layout';

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
    }
  }
`;

function LayoutContainer(props) {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
          );
        }
        return <Layout {...props} siteTitle={props.siteTitle} siteSubtitle={props.siteSubtitle} />;
      }}
    />
  );
}

export default LayoutContainer;
