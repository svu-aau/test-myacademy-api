import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';

import styles from './student-index-grid.module.css';
import FilterBar from '../grids/filter-bar';

const removeSpace = (word) => word.replace(/\s/g, '');

const sortStudents = (students) =>
  students.filter(({ name }) => name).sort((a, b) => removeSpace(a.name).localeCompare(removeSpace(b.name)));

const findPopulatedFilters = (arr) =>
  arr
    .reduce((acc, studentData) => {
      const title = studentData[0];
      const count = studentData[1].length;

      acc.push({ title, count });

      return acc;
    }, [])
    .sort((a, b) => removeSpace(a.title).localeCompare(removeSpace(b.title)));

function mapStudents(studentsToMap) {
  let mappedStudents = [];

  studentsToMap.map(({ school, name, id, slug }) => {
    if (!school) {
      return null;
    }

    return Object.getOwnPropertyDescriptor(mappedStudents, school.title)
      ? mappedStudents[school.title].push({ name, id, slug })
      : (mappedStudents[school.title] = [{ name, id, slug }]);
  });

  return Object.entries(mappedStudents);
}
function StudentsIndexGrid({ schools, students }) {
  const placeholderFilter = 'All';
  let [filteredStudents, setFilteredStudents] = useState(students.filter(({ name, slug }) => name && slug));
  let [populatedFilters, setPopulatedFilters] = useState([]);

  useEffect(() => {
    const newPopulatedFilters = findPopulatedFilters(
      mapStudents(filteredStudents).sort((a, b) => removeSpace(a[0]).localeCompare(removeSpace(b[0])))
    )
      .filter(({ count }) => count >= 1)
      .map(({ title }) => ({ title }));

    setPopulatedFilters(newPopulatedFilters);
  }, [students]);

  function handleFilter(filter) {
    if (filter === placeholderFilter) {
      setFilteredStudents(students.filter(({ name, slug }) => name && slug));
    } else {
      const filtered = students.filter(({ name, school, slug }) => name && slug && school && school.title === filter);

      setFilteredStudents(filtered);
    }
  }

  let mappedStudents = mapStudents(filteredStudents).sort((a, b) => removeSpace(a[0]).localeCompare(removeSpace(b[0])));

  const renderContent = (renderedSchool) => {
    return renderedSchool.map(([schoolTitle, renderedStudents]) => {
      if (!schools) {
        return null;
      }
      const schoolSlug = schools.find(({ title }) => title === schoolTitle).slug;

      return (
        <div key={schoolSlug.current}>
          <Link to={`/schools/${schoolSlug.current}`}>
            <h2>{schoolTitle}</h2>
          </Link>

          <ul className={styles.grid}>
            {sortStudents(renderedStudents).map(({ name, id, slug }) => {
              return (
                <Link key={id} to={`/schools/${schoolSlug.current}/students/${slug.current}`}>
                  <li>
                    <p>{name}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className={styles.root}>
      {populatedFilters.length > 0 && (
        <FilterBar
          handleClick={handleFilter}
          items={populatedFilters}
          placeholder={placeholderFilter}
          showFilters={true}
        />
      )}

      <div>{renderContent(mappedStudents)}</div>
    </div>
  );
}

StudentsIndexGrid.defaultstudents = {
  schools: [],
  students: [],
};

export default StudentsIndexGrid;
