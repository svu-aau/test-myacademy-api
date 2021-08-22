import Masonry from 'react-masonry-css';
import React, { useState } from 'react';

import StudentPreview from './student-preview';
import { root, myMasonryGridColumn, myMasonryGrid, grid } from './students-grid.module.css';
import FilterBar from '../grids/filter-bar';

function StudentsGrid({ filters, students, masonry, school }) {
  // append 'ShowAll' to avoid placeholders having same value as category or major
  // (e.g., `Illustration` school has `Illustration` major)
  const categoryPlaceholder = 'CategoriesShowAll';
  const programPlaceholder = `${school}ShowAll`;
  let assetCategories = [];
  let populatedFilters = [];
  let [programFilter, setProgramFilter] = useState(programPlaceholder);
  let [categoryFilter, setCategoryFilter] = useState(categoryPlaceholder);
  let [filteredStudents, setFilteredStudents] = useState(students);
  let [allFilteredStudents, setAllFilteredStudents] = useState(students);
  let [filterSelected, setFilterSelected] = useState(null); // the filter the user selected
  let showFilters = filters && filters.length > 1;
  let showAssetCategories = false;
  let showFilterBar = showFilters;

  /*
   * Handle user's filter selection
   */
  function handleFilter(filter, categories = false) {
    // handle Categories filter selection
    if (categories) {
      setFilterSelected(categoryPlaceholder);
      let preFilterStudents = [];

      if (programFilter === programPlaceholder) {
        // - show students for all Programs
        preFilterStudents = students;
      } else {
        // - pre filter students by selected Major first if there are two filters
        preFilterStudents = students.filter(({ major }) => major.title === programFilter);
      }

      if (filter === categoryPlaceholder) {
        // - show students for all Categories
        setAllFilteredStudents(preFilterStudents);
      } else {
        // - filter students by selected Category
        const filtered = preFilterStudents.filter(({ assetCategories }, index) => {
          return assetCategories.includes(filter);
        });
        setAllFilteredStudents(filtered);
      }

      setCategoryFilter(filter);
    } else {
      // handle Majors (Programs) filter selection
      setFilterSelected(programPlaceholder);
      if (filter === programPlaceholder) {
        // - show students for all Programs
        setFilteredStudents(students);
      } else {
        // - filter students by selected Major
        const filtered = students.filter(({ major }, idx) => {
          return major.title === filter;
        });
        setFilteredStudents(filtered);
      }
      setProgramFilter(filter);
      // reset the Categories filter when the Majors filter is selected
      setCategoryFilter(categoryPlaceholder);
    }
  }

  /*
   * Determine filter options to display
   */
  function findPopulatedFilters(type = 'major') {
    // Categories filter options
    if (type === 'categories') {
      let filterValues = [];
      if (showFilters && categoryFilter === categoryPlaceholder) {
        // - School has 2 filters: 1. Majors 2. Categories; use students already filtered by Major (`filteredStudents`)
        filteredStudents.forEach(({ assetCategories }) => {
          filterValues = [...new Set(filterValues.concat(assetCategories))];
        });
        return filterValues;
      }

      // - School only has one filter: Categories; use original student list (ie, `students`)
      students.forEach(({ assetCategories }) => {
        filterValues = [...new Set(filterValues.concat(assetCategories))];
      });
      return filterValues;
    }

    // - School Majors filter options
    return students.reduce((acc, { major }) => {
      if (major) {
        const title = major.title;
        const index = acc.findIndex((val) => val.title === title);

        if (index >= 0) {
          acc[index].count += 1;
        } else {
          acc.push({ title, count: 1 });
        }
      }

      return acc;
    }, []);
  }

  if (masonry) {
    return (
      <Masonry
        breakpointCols={{
          default: 4,
          900: 2,
          675: 1,
        }}
        className={myMasonryGrid}
        columnClassName={myMasonryGridColumn}
      >
        {students.map((student) => (
          <StudentPreview key={student.id} masonry {...student} />
        ))}
      </Masonry>
    );
  }

  if (showFilters) {
    populatedFilters = findPopulatedFilters()
      .filter(({ count }) => count >= 1)
      .map(({ title }) => ({ title }));

    if (!populatedFilters.length || populatedFilters.length === 0) {
      showFilters = false;
    }
  }

  assetCategories = findPopulatedFilters('categories');
  showAssetCategories = assetCategories.length > 1;
  showFilters = populatedFilters.length > 1;
  showFilterBar = showFilters || showAssetCategories;

  return (
    <div className={root}>
      {showFilterBar && (
        <FilterBar
          secondaryItems={showAssetCategories ? assetCategories : null}
          handleClick={handleFilter}
          items={populatedFilters}
          placeholder={programPlaceholder}
          secondaryPlaceholder={categoryPlaceholder}
          showFilters={showFilters}
          primaryOptionLabel="All Programs"
          secondaryOptionLabel="All Categories"
        />
      )}

      <ul className={grid}>
        {(filterSelected === programPlaceholder || !filterSelected) &&
          filteredStudents &&
          filteredStudents.map((student) => (
            <li key={student.id}>
              <StudentPreview {...student} />
            </li>
          ))}
        {filterSelected === categoryPlaceholder &&
          allFilteredStudents &&
          allFilteredStudents.map((student) => (
            <li key={student.id}>
              <StudentPreview {...student} />
            </li>
          ))}
      </ul>
    </div>
  );
}

StudentsGrid.defaultstudents = {
  title: '',
  students: [],
  browseMoreHref: '',
};

export default StudentsGrid;
