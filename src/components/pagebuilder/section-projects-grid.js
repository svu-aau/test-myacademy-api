import React from 'react';

import { StaticQuery, graphql } from 'gatsby';
import BlockContent from '../block-content';
import FeaturedProjectsGrid from '../projects/featured-projects-grid';
import ProjectsGrid from '../projects/projects-grid';
import Container from '../layout/container';
import Section from '../sections/section';
import { mapEdgesToNodes, sortByTitle } from '../../lib/helpers';

const MAX_RESULTS = 999;

// see data/fragments/PageContent
const SectionProjectsGrid = ({ section }) => {
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
    projects: selectedProjects,
    limitResults,
    narrowWidth,
  } = section;

  const limit = limitResults && limitResults > 0 ? limitResults : MAX_RESULTS;

  // If school is select, use that featured list
  // otherwise, use selected list of projects
  // if this projectList is empty, we will use allProjects
  const projectList = school && school.featuredProjects.length ? school.featuredProjects : selectedProjects;

  let GridComponent = ProjectsGrid;

  switch (gridStyle) {
    // Add other grid types here
    case 'featured-projects-grid':
      GridComponent = FeaturedProjectsGrid;
      break;
  }

  return (
    <StaticQuery
      key={_key}
      query={allProjectsQuery}
      render={({ allProjects }) => {
        const allProjectsSorted = sortByTitle(mapEdgesToNodes(allProjects));
        const projects = [...(projectList.length ? projectList : allProjectsSorted)].slice(0, limit);
        return (
          <div style={{ backgroundColor }}>
            {_rawIntro && (
              <Section color={backgroundColor} alignment="center">
                <Container narrower={narrowWidth}>
                  <BlockContent blocks={_rawIntro} />
                </Container>
              </Section>
            )}

            <GridComponent
              projects={projects}
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
        );
      }}
    />
  );
};

export default SectionProjectsGrid;

const allProjectsQuery = graphql`
  query AllProjectsQuery {
    allProjects: allSanityProject {
      edges {
        node {
          ...Project
        }
      }
    }
  }
`;
