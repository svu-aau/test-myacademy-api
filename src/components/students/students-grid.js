import Masonry from 'react-masonry-css';
import React, { useState } from 'react';

import StudentPreview from './student-preview';
import styles from './students-grid.module.css';
import FilterBar from '../grids/filter-bar';

function StudentsGrid({ filters, students, masonry, school }) {
  const categoryPlaceholder = 'Categories';
  const programPlaceholder = school;
  let assetCategories = [];
  let populatedFilters = [];
  let [programFilter, setProgramFilter] = useState(programPlaceholder);
  let [categoryFilter, setCategoryFilter] = useState(categoryPlaceholder);
  let [filteredStudents, setFilteredStudents] = useState(students);
  let [allFilteredStudents, setAllFilteredStudents] = useState(students);
  let showFilters = filters && filters.length > 1;
  let showAssetCategories = false;
  let showFilterBar = showFilters;

  function handleFilter(filter, categories = false) {
    if (categories) {
      let preFilterStudents = [];

      if (programFilter === programPlaceholder) {
        preFilterStudents = students;
      } else {
        const filtered = students.filter(({ major }) => major.title === programFilter);

        preFilterStudents = filtered;
      }

      if (filter === categoryPlaceholder) {
        setAllFilteredStudents(preFilterStudents);
      } else {
        const filtered = preFilterStudents.filter(({ assetCategory }) => assetCategory === filter);

        setAllFilteredStudents(filtered);
      }

      setCategoryFilter(filter);
    } else {
      if (filter === programPlaceholder) {
        setFilteredStudents(students);
      } else {
        const filtered = students.filter(({ major }) => major.title === filter);

        setFilteredStudents(filtered);
      }

      setProgramFilter(filter);
      setCategoryFilter(categoryPlaceholder);
    }
  }

  function findPopulatedFilters(type = 'major') {
    if (type === 'categories') {
      if (showFilters && categoryFilter === categoryPlaceholder) {
        return filteredStudents.reduce((acc, { assetCategory }) => {
          if (assetCategory && !acc.includes(assetCategory)) {
            acc.push(assetCategory);
          }
          return acc;
        }, []);
      }
      return students.reduce((acc, { assetCategory }) => {
        if (assetCategory && !acc.includes(assetCategory)) {
          acc.push(assetCategory);
        }
        return acc;
      }, []);
    }

    return students.reduce((acc, { major }) => {
      if (major && major.title !== school) {
        const title = major.title;
        const index = acc.findIndex((val) => val.title === title);

        if (index >= 0) {
          acc[index] += 1;
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
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGridColumn}
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

  if (assetCategories.length >= 1) {
    showAssetCategories = true;
  }

  showFilterBar = showFilters || showAssetCategories;

  return (
    <div className={styles.root}>
      {showFilterBar && (
        <FilterBar
          assetCategories={showAssetCategories ? assetCategories : null}
          handleClick={handleFilter}
          items={populatedFilters}
          placeholder={programPlaceholder}
          categoryPlaceholder={categoryPlaceholder}
          showFilters={showFilters}
        />
      )}

      <ul className={styles.grid}>
        {!showAssetCategories &&
          filteredStudents &&
          filteredStudents.map((student) => (
            <li className={styles.gridCell} key={student.id}>
              <StudentPreview {...student} />
            </li>
          ))}
        {showAssetCategories &&
          allFilteredStudents &&
          allFilteredStudents.map((student) => (
            <li className={styles.gridCell} key={student.id}>
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
