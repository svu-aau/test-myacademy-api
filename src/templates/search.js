import React, { useState, useEffect } from 'react';
import { navigate, graphql } from 'gatsby';
import Layout from '../containers/layout';
import SEO from '../components/layout/seo';
import Container from '../components/layout/container';
import Section from '../components/sections/section';
import PageSearch from '../components/page-search';
import { SectionHeader } from '@aauweb/design-library';
import { root, searchBox } from './search.module.css';

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
      <div className={root}>
        <SectionHeader
          headerImg={defaultHeroImage.childImageSharp.gatsbyImageData.images.fallback.src}
          imgAlt="Search Hero Image"
          title={`Search Results for "${query}"`}
        ></SectionHeader>
      </div>
      <div className={searchBox}>
        <Section noPaddingTop>
          <Container>
            <PageSearch pages={allPages} searchTerm={query} origin={origin} />
          </Container>
        </Section>
      </div>
    </Layout>
  );
};

export default SearchTemplate;
