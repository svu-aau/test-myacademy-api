import React from 'react';

import { StaticQuery, graphql } from 'gatsby';
import BlockContent from '../block-content';
import Container from '../layout/container';
import Section from '../sections/section';
import SchoolsGrid from '../schools/schools-grid';
import { mapEdgesToNodes, sortByTitle } from '../../lib/helpers';

// see data/fragments/PageContent
const SectionSchoolsGrid = ({ section }) => {
  const {
    _key,
    _rawIntro,
    _rawOutro,
    backgroundColor,
    narrowWidth,
    // gridStyle,
    schools: selectedSchools,
  } = section;

  let GridComponent = SchoolsGrid;

  // switch(gridStyle) {
  //   // Add other school grid types here
  //   case 'featured-projects-grid':
  //     GridComponent = FeaturedProjectsGrid;
  //     break;
  // }

  return (
    <StaticQuery
      key={_key}
      query={allSchoolsQuery}
      render={({ allSchools }) => {
        const allSchoolsSorted = sortByTitle(mapEdgesToNodes(allSchools));
        const schools = selectedSchools.length ? selectedSchools : allSchoolsSorted;

        return (
          <div style={{ backgroundColor }}>
            {_rawIntro && (
              <Section color={backgroundColor} alignment="center">
                <Container narrower={narrowWidth}>
                  <BlockContent blocks={_rawIntro} />
                </Container>
              </Section>
            )}

            {schools && <GridComponent schools={schools} />}

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

export default SectionSchoolsGrid;

const allSchoolsQuery = graphql`
  query AllSchoolsQuery {
    allSchools: allSanitySchool {
      edges {
        node {
          ...SchoolPreview
        }
      }
    }
  }
`;
