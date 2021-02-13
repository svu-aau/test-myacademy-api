import React from 'react';

import { StaticQuery, graphql } from 'gatsby';
import BlockContent from '../block-content';
import Container from '../layout/container';
import Section from '../sections/section';
import IndustryGrid from '../sections/industry-grid';
import { mapEdgesToNodes } from '../../lib/helpers';

// see data/fragments/PageContent
const SectionIndustryGrid = ({ section }) => {
  const { _key, _rawIntro, backgroundColor, limitResults, school, companies: selectedCompanies } = section;

  // If school is select, use that featured list
  // otherwise, use selected list of projects
  // if this projectList is empty, we will use allProjects
  let companyList = school && school.hiringCompanies.length ? school.hiringCompanies : selectedCompanies;

  const render = ({ allCompanies }) => (
    <Section key={_key} color={backgroundColor} alignment="center">
      <IndustryGrid
        limit={limitResults}
        shuffled={!companyList.length}
        hiringCompanies={companyList.length ? companyList : mapEdgesToNodes(allCompanies)}
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
