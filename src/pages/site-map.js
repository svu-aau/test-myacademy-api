import React from 'react';
import { Link, graphql } from 'gatsby';
import Container from '../components/layout/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import Section from '../components/sections/section';
import { link_container, link } from './site-map.module.css';
import { breadcrumb, breadcrumbLinkSeperator } from '../components/layout/layout.module.css';

// export const query = graphql`
//   query SiteMapQuery {
//     schools: allSanitySchool(sort: { fields: title }) {
//       edges {
//         node {
//           _id
//           title
//           slug {
//             current
//           }
//         }
//       }
//     }
//   }
// `;

const SiteMap = (props) => {
  // const {
  //   data: { schools },
  //   errors,
  // } = props;

  return (
    <Layout>
      {/* {errors && <SEO title="GraphQL Error" />}
      {!errors && <SEO title="Site Map" path={props.location.pathname} />} */}

      {/* {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )} */}

      <Section>
        <Container>
          <div className={breadcrumb}>
            <Link to={'/'}>HOME</Link>
            <span className={breadcrumbLinkSeperator}>&gt;</span>
            <Link to="/site-maps">SITE MAP</Link>
          </div>

          <Link to={'/'}>
            <h2 className={link} style={{ paddingTop: '2rem' }}>
              HOME
            </h2>
          </Link>
          <div className={link_container}></div>
        </Container>
      </Section>
    </Layout>
  );
};

export default SiteMap;
