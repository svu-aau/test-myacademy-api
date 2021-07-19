import React from 'react';

import { StaticQuery, graphql } from 'gatsby';
import BlockContent from '../block-content';
import FeaturedProjectsGrid from '../projects/featured-projects-grid';
import ProjectGrid from '../projects/project-grid';
import Container from '../layout/container';
import Section from '../sections/section';
import { mapEdgesToNodes } from '../../lib/helpers';

const MAX_RESULTS = 999;

// see data/fragments/PageContent
const SectionProjectGrid = ({ section }) => {
  const {
    _key,
    _rawIntro,
    _rawOutro,
    backgroundColor,
    gridStyle,
    showPagination,
    linkOverride,
    showFilters,
    school,
    projects,
    limitResults,
    narrowWidth,
  } = section;

  const limit = limitResults && limitResults > 0 ? limitResults : MAX_RESULTS;

  // If school is select, use that featured list
  // otherwise, use selected list of projects
  // if this projectList is empty, we will use allProjects
  let projectList = school && school.featuredProjects.length ? school.featuredProjects : projects;

  let GridComponent = ProjectGrid;

  switch (gridStyle) {
    // Add other grid types here
    case 'featured-projects-grid':
      GridComponent = FeaturedProjectsGrid;
      break;
  }

  return (
    <StaticQuery
      key={_key}
      query={allSectionProjects}
      render={({ allProjects }) => (
        <div style={{ backgroundColor }}>
          {_rawIntro && (
            <Section color={backgroundColor} alignment="center">
              <Container narrower={narrowWidth}>
                <BlockContent blocks={_rawIntro} />
              </Container>
            </Section>
          )}

          <GridComponent
            type="assets"
            projects={[...(projectList.length ? projectList : mapEdgesToNodes(allProjects))].slice(0, limit)}
            showPagination={showPagination}
            showFilters={showFilters}
            linkOverride={linkOverride}
          />

          {_rawOutro && (
            <Section color={backgroundColor} alignment="center">
              <Container narrower={narrowWidth}>
                <BlockContent blocks={_rawOutro} />
              </Container>
            </Section>
          )}
        </div>
      )}
    />
  );
};

export default SectionProjectGrid;

const allSectionProjects = graphql`
  query AllSectionProjectsQuery {
    allSectionProjects: allSanityProject {
      edges {
        node {
          ...Project
        }
      }
    }
  }
`;
