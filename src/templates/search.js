import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import Layout from '../containers/layout';
import SEO from '../components/layout/seo';
import Container from '../components/layout/container';
import Section from '../components/sections/section';
import PageSearch from '../components/page-search';

const SearchTemplate = (props) => {
  const { pageContext, location } = props;
  const { pageData } = pageContext;
  const { allPages } = pageData;
  const { search, origin } = location;
  const [query, setQuery] = useState();

  useEffect(() => {
    const query = search.includes('?query=') && search.match(/query=([^&]+)/)[1];
    query ? setQuery(query) : navigate(-1);
  }, [search]);

  return (
    <Layout>
      <SEO title="Search Results" />
      <div style={{ height: '98px' }} />
      <Section>
        <Container>
          <PageSearch pages={allPages} searchTerm={query} origin={origin} />
        </Container>
      </Section>
    </Layout>
  );
};

export default SearchTemplate;
