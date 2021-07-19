import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { sortByName } from '../../lib/helpers';
import styles from './student-profile.module.css';

export default function StudentNav({ schoolSlug = null, studentId = null }) {
  const { allStudents } = useStaticQuery(graphql`
    query StudentNavQuery {
      allStudents: allSanityStudent(filter: { publishedAt: { ne: null } }) {
        nodes {
          name
          id
          slug {
            current
          }
          school {
            slug {
              current
            }
          }
        }
      }
    }
  `);

  const students = sortByName(
    allStudents.nodes.filter(({ school }) => school).filter((n) => !schoolSlug || n.school.slug.current === schoolSlug)
  );
  const currIndex = students.findIndex((s) => s.id === studentId);
  const prevStudent = students[currIndex - 1] ? students[currIndex - 1] : null;
  const nextStudent = students[currIndex + 1] ? students[currIndex + 1] : null;

  return (
    (prevStudent || nextStudent) &&
    schoolSlug && (
      <div className={styles.studentNavigation}>
        {prevStudent && prevStudent.slug ? (
          <Link
            className={styles.studentNavigationLink}
            to={`/schools/${schoolSlug}/students/${prevStudent.slug.current}`}
          >
            <ChevronLeftIcon /> Prev Student
          </Link>
        ) : (
          <div style={{ width: '122.1px' }} />
        )}
        {nextStudent && nextStudent.slug ? (
          <Link
            className={styles.studentNavigationLink}
            to={`/schools/${schoolSlug}/students/${nextStudent.slug.current}`}
          >
            Next Student <ChevronRightIcon />
          </Link>
        ) : (
          <div style={{ width: '122.1px' }} />
        )}
      </div>
    )
  );
}
