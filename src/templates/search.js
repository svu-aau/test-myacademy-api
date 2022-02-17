import React, { useState, useEffect } from 'react';
import { navigate, graphql } from 'gatsby';
import Layout from '../containers/layout';
import SEO from '../components/layout/seo';
import Container from '../components/layout/container';
import Section from '../components/sections/section';
import PageSearch from '../components/page-search';
import Hero from '../components/layout/hero';

export const query = graphql`
  query SearchQuery {
    defaultHeroImage: file(relativePath: { eq: "search-hero.jpeg" }) {
      childImageSharp {
        gatsbyImageData(width: 1440, placeholder: BLURRED, layout: FIXED)
      }
    }
  }
`;

const SearchTemplate = (props) => {
  const {
    pageContext,
    location,
    data: { defaultHeroImage },
  } = props;
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
      <Hero
        imageAlt="search hero"
        style={{ overflow: 'hidden' }}
        backgroundImage={defaultHeroImage?.childImageSharp?.gatsbyImageData}
      />
      <Section>
        <Container>
          <PageSearch pages={allPages} searchTerm={query} origin={origin} />
        </Container>
      </Section>
    </Layout>
  );
};

export default SearchTemplate;
