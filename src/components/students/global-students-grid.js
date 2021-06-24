import React, { useState, forwardRef, useEffect } from 'react';

import StudentPreview from './student-preview';
import styles from './global-students-grid.module.css';
import FilterBar from '../grids/filter-bar';
import PaginationBar from '../grids/pagination-bar';
import { paginate } from '../../lib/helpers';

function StudentsGrid({ students, iso, updateCount, updateCountryFilter }, ref) {
  const countryPlaceholder = 'Country';
  const programPlaceholder = 'Program';
  let assetCategories = [];
  let populatedFilters = [];
  let [programFilter, setProgramFilter] = useState(programPlaceholder);
  let [countryFilter, setCountryFilter] = useState(countryPlaceholder);
  let [filteredStudents, setFilteredStudents] = useState(students.filter(({ school, slug }) => school && slug));
  let showPagination = filteredStudents.length > 20;
  let showFilterBar = false;

  let paginationData = paginate(1, filteredStudents.length);
  let [pages, setPages] = useState(paginationData.pages.length);
  let [paginationLocation, setPaginationLocation] = useState([0, paginationData.endIndex]);

  function handlePagination(num, studs = filteredStudents) {
    paginationData = paginate(num, studs.length);

    setPages(paginationData.pages.length);
    setPaginationLocation([paginationData.startIndex, paginationData.endIndex]);
    scroll({
      top: ref.current.offsetTop - 75,
      behavior: 'smooth',
    });
  }

  function findPopulatedFilters(type = 'program') {
    if (type === 'country') {
      let preFilterStudents = [];

      if (programFilter === programPlaceholder) {
        preFilterStudents = students;
      } else {
        preFilterStudents = students.filter(({ major }) => major && major.title === programFilter);
      }

      return preFilterStudents.reduce((acc, { country }) => {
        if (country) {
          const { title, code } = country;
          const index = acc.findIndex((val) => val.title === title);

          if (index >= 0) {
            acc[index].count += 1;
          } else {
            acc.push({ title, code, count: 1 });
          }
        }
        return acc;
      }, []);
    }

    return students.reduce((acc, { major }) => {
      if (major) {
        const { title } = major;
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

  function handleFilter(filter, secondaryFilter = false) {
    let filtered = [];

    const populatedStudents = students.filter(({ school, slug }) => school && slug);

    if (secondaryFilter) {
      let preFilterStudents = [];

      if (programFilter === programPlaceholder) {
        preFilterStudents = populatedStudents;
      } else {
        preFilterStudents = populatedStudents.filter(({ major }) => major && major.title === programFilter);
      }

      if (filter === countryPlaceholder) {
        filtered = preFilterStudents;
      } else {
        filtered = preFilterStudents.filter(({ country }) => country && country.code === filter);
      }

      setFilteredStudents(filtered);
      setCountryFilter(filter);
    } else {
      if (filter === programPlaceholder) {
        filtered = populatedStudents;
      } else {
        filtered = populatedStudents.filter(({ major }) => major && major.title === filter);
      }

      setFilteredStudents(filtered);
      setProgramFilter(filter);
      setCountryFilter(countryPlaceholder);
    }

    handlePagination(1, filtered);
  }

  populatedFilters = findPopulatedFilters()
    .filter(({ count }) => count >= 1)
    .map(({ title }) => ({ title }));

  assetCategories = findPopulatedFilters('country');
  showFilterBar = assetCategories.length > 0 && populatedFilters.length > 0;

  return (
    <div className={styles.root} ref={ref}>
      {showFilterBar && (
        <FilterBar
          primaryOptionLabel="All Schools"
          secondaryOptionLabel="All Countries"
          secondaryItems={assetCategories}
          handleClick={handleFilter}
          items={populatedFilters}
          placeholder={programPlaceholder}
          secondaryPlaceholder={countryPlaceholder}
          showFilters={showFilterBar}
          changeSecondaryFilter={updateCountryFilter}
          changeFilterCount={updateCount}
        />
      )}

      <ul className={styles.grid}>
        {filteredStudents &&
          filteredStudents.slice(paginationLocation[0], paginationLocation[1]).map((student) => (
            <li className={styles.gridCell} key={student.id}>
              <StudentPreview {...student} />
            </li>
          ))}
      </ul>

      {showPagination && <PaginationBar pages={pages} handleClick={handlePagination} />}
    </div>
  );
}

export default forwardRef(StudentsGrid);
