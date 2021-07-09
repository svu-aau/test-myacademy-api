import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Container from '../layout/container';
import Section from '../sections/section';
import styles from './site-map.module.css';

// see data/fragments/PageContent
const SiteMap = () => {
  const { schools, projects, students } = useStaticQuery(graphql`
    query siteMapQuery {
      schools: allSanitySchool(sort: { fields: title }) {
        edges {
          node {
            _id
            title
            slug {
              current
            }
          }
        }
      }
      projects: allSanityProject(sort: { fields: title }) {
        edges {
          node {
            _id
            title
            slug {
              current
            }
            school {
              _id
              title
              slug {
                current
              }
            }
          }
        }
      }
      students: allSanityStudent(sort: { fields: name }) {
        edges {
          node {
            _id
            name
            slug {
              current
            }
            school {
              _id
              title
              slug {
                current
              }
            }
          }
        }
      }
    }
  `);

  return (
    <Section>
      <Container>
        <Link to={'/'}>
          <h2 className={styles.link}>HOME</h2>
        </Link>
        <div className={styles.link_container}>
          <Link to={'/schools'}>
            <h3 className={styles.link}>Schools</h3>
          </Link>
          <div className={styles.link_container}>
            {schools?.edges?.length &&
              schools.edges.map((school) => (
                <>
                  <Link to={`/schools/${school.node.slug.current}`} key={school.node._id}>
                    {school.node.title}
                  </Link>
                  <div className={styles.link_container}>
                    {students?.edges?.length &&
                      students.edges.map(
                        (student) =>
                          student.node?.school?._id === school.node._id && (
                            <Link to={`/students/${student.node.slug.current}`} key={student.node._id}>
                              {student.node.name}
                            </Link>
                          )
                      )}
                  </div>
                </>
              ))}
          </div>

          <Link to={'/projects'}>
            <h3 className={styles.link}>Projects</h3>
          </Link>
          <div className={styles.link_container}>
            {projects?.edges?.length &&
              projects.edges.map((project) => (
                <>
                  <Link to={`/projects/${project.node.slug.current}`} key={project.node._id}>
                    {project.node.title}
                  </Link>
                  <div className={styles.link_container}>
                    {schools?.edges?.length &&
                      schools.edges.map(
                        (school) =>
                          school.node?._id === project.node?.school?._id && (
                            <Link to={`/schools/${school.node.slug.current}`} key={school.node._id}>
                              {school.node.title}
                            </Link>
                          )
                      )}
                  </div>
                </>
              ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default SiteMap;
