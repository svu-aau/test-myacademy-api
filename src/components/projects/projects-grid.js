import { graphql, StaticQuery } from 'gatsby';
import React, { useRef, useState } from 'react';

import { mapEdgesToNodes, sortByTitle, paginate } from '../../lib/helpers';
import ColumnGrid from '../grids/column-grid';
import FilterBar from '../grids/filter-bar';
import PaginationBar from '../grids/pagination-bar';
import { root } from './projects-grid.module.css';

function ProjectsGrid({ projects, linkOverride, showFilters = false, showPagination = false }) {
  const availableProjects = projects.filter(({ heroImage }) => heroImage[0] && heroImage[0].image !== null);

  let paginationData = paginate(1, availableProjects.length);
  let [filteredProjects, setFilteredProjects] = useState(availableProjects);
  let [pages, setPages] = useState(paginationData.pages.length);
  let [paginationLocation, setPaginationLocation] = useState([0, paginationData.endIndex]);

  let rootRef = useRef();

  const availableSchoolsArray = availableProjects
    .filter(({ school }) => school)
    .map(({ school }) => school.slug.current)
    .filter((value, index, self) => self.indexOf(value) === index);

  function handlePagination(num, projs = filteredProjects) {
    paginationData = paginate(num, projs.length);
    setPages(paginationData.pages.length);
    setPaginationLocation([paginationData.startIndex, paginationData.endIndex]);
    window.scroll({
      top: rootRef.current.offsetTop - 75,
      behavior: 'smooth',
    });
  }

  function handleFilter(filter) {
    if (filter === 'Schools') {
      setFilteredProjects(availableProjects);
      handlePagination(1, availableProjects);
    } else {
      const filtered = availableProjects.filter((obj) => {
        if (obj.school === null) {
          return false;
        }

        return obj.school.title === filter;
      });

      handlePagination(1, filtered);
      setFilteredProjects(filtered);
    }
  }

  return (
    <StaticQuery
      query={allSchoolsFilterQuery}
      render={({ allSchoolsFilter }) => {
        const schools = mapEdgesToNodes(allSchoolsFilter);

        let availableSchools = sortByTitle(schools.filter(({ slug }) => availableSchoolsArray.includes(slug.current)));

        return (
          <div className={root} ref={rootRef}>
            {showFilters && allSchoolsFilter && schools.length && (
              <FilterBar handleClick={handleFilter} items={availableSchools} placeholder="Schools" showFilters />
            )}
            <ColumnGrid
              linkOverride={linkOverride}
              items={filteredProjects.slice(paginationLocation[0], paginationLocation[1])}
            />
            {showPagination && <PaginationBar pages={pages} handleClick={handlePagination} />}
          </div>
        );
      }}
    />
  );
}

const allSchoolsFilterQuery = graphql`
  query AllSchoolsFilterQuery {
    allSchoolsFilter: allSanitySchool {
      edges {
        node {
          ...School
        }
      }
    }
  }
`;

export default ProjectsGrid;
