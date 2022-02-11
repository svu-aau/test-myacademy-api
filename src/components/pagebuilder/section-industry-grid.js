import React from 'react';

import { StaticQuery, graphql } from 'gatsby';
import BlockContent from '../block-content';
import Section from '../sections/section';
import IndustryGrid from '../sections/industry-grid';
import { mapEdgesToNodes } from '../../lib/helpers';

// see data/fragments/PageContent
const SectionIndustryGrid = ({ section, slug }) => {
  const { _key, _rawIntro, backgroundColor, limitResults, school, companies: selectedCompanies } = section;

  // If a school is selected, use hiring companies from that list
  // otherwise, use all hiring companies
  const companyList = school && school.hiringCompanies.length ? school.hiringCompanies : selectedCompanies;
  const selected = companyList.length > 0;

  const render = ({ allCompanies }) => (
    <Section id={_key} key={_key} color={backgroundColor} alignment="center">
      <IndustryGrid
        limit={limitResults}
        sortAlpha={!selected}
        slug={slug}
        hiringCompanies={selected ? companyList : mapEdgesToNodes(allCompanies)}
      >
        {_rawIntro && <BlockContent blocks={_rawIntro} />}
      </IndustryGrid>
    </Section>
  );

  return <StaticQuery key={_key} query={allHiringCompaniesQuery} render={render} />;
};

export default SectionIndustryGrid;

const allHiringCompaniesQuery = graphql`
  query AllHiringCompaniesQuery {
    allCompanies: allSanityHiringCompany {
      edges {
        node {
          ...HiringCompanies
        }
      }
    }
  }
`;
