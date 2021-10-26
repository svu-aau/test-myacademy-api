import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/layout/seo';
import Container from '../components/layout/container';
import Section from '../components/sections/section';

const NotFoundPage = () => {
  return (
    <Layout dark>
      <SEO title="404: Not found" />
      <Section color="dark">
        <Container narrow>
          <h1>Page not found</h1>
          <p>Hello. It looks like we don&lsquo;t have the page you were looking for.</p>
        </Container>
      </Section>
    </Layout>
  );
};

export default NotFoundPage;
