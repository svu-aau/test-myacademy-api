import { graphql, StaticQuery } from 'gatsby';
import React, { useState } from 'react';

import { mapEdgesToNodes, sortByTitle } from '../../lib/helpers';
import ColumnGrid from '../grids/column-grid';
import FilterBar from '../grids/filter-bar';
import PaginationBar from '../grids/pagination-bar';
import styles from './projects-grid.module.css';

function paginate(currentPage = 1, totalItems = 50) {
  const pageSize = 20;
  const maxPages = 4;
  // calculate total pages
  let totalPages = Math.ceil(totalItems / pageSize);

  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage, endPage;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize, totalItems);

  // create an array of pages to ng-repeat in the pager control
  let pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);

  // return object with all pager properties required by the view
  return {
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages,
  };
}

function ProjectsGrid({ projects, linkOverride, showFilters = false, showPagination = false }) {
  const availableProjects = projects.filter(({ heroImage }) => heroImage[0] && heroImage[0].image !== null);

  let paginationData = paginate(1, availableProjects.length);
  let [filteredProjects, setFilteredProjects] = useState(availableProjects);
  let [pages, setPages] = useState(paginationData.pages);
  let [paginationLocation, setPaginationLocation] = useState([0, paginationData.endIndex]);

  const availableSchoolsArray = availableProjects
    .filter(({ school }) => school)
    .map(({ school }) => school.slug.current)
    .filter((value, index, self) => self.indexOf(value) === index);

  function handlePagination(num, projs = filteredProjects) {
    paginationData = paginate(num, projs.length);
    setPages(paginationData.pages);
    setPaginationLocation([paginationData.startIndex, paginationData.endIndex]);
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
          <div className={styles.root}>
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
