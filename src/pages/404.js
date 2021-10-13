import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/layout/seo';
import { graphql, Link } from 'gatsby';
import Container from '../components/layout/container';
import { footerSchools, footerColumns, columnLink } from '../components/layout/footer.module.css';
import Section from '../components/sections/section';

const NotFoundPage = ({ data }) => {
  const { schools } = data;

  return (
    <Layout dark>
      <SEO title="404: Not found" />
      <Section color="dark">
        <Container narrow>
          <h1>Page not found</h1>
          <p>
            Hello. It looks like we don&lsquo;t have the page you were looking for. Please continue to view incredible
            graduating student art in our schools listed below.
          </p>
          <br />
          <br />
          <div className={footerSchools}>
            <div className={footerColumns}>
              {schools.nodes &&
                schools.nodes
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((node) => (
                    <li className={columnLink} key={node.id}>
                      <Link to={`/schools/${node.slug.current}`}>{node.title}</Link>
                    </li>
                  ))}
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export const query = graphql`
  query NotFoundPageQuery {
    schools: allSanitySchool {
      nodes {
        ...School
      }
    }
  }
`;

export default NotFoundPage;
