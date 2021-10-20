import React from 'react';
import { Link, graphql } from 'gatsby';
import Container from '../components/layout/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import Section from '../components/sections/section';
import { link_container, link } from './site-map.module.css';
import { breadcrumb, breadcrumbLinkSeperator } from '../components/layout/layout.module.css';

export const query = graphql`
  query SiteMapQuery {
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
`;

const SiteMap = (props) => {
  const {
    data: { schools, students },
    errors,
  } = props;

  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {!errors && <SEO title="Site Map" path={props.location.pathname} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      <Section>
        <Container>
          <div className={breadcrumb}>
            <Link to={'/'}>HOME</Link>
            <span className={breadcrumbLinkSeperator}>&gt;</span>
            <Link to="/site-maps">SITE MAP</Link>
          </div>

          <Link to={'/'}>
            <h2 className={link} style={{ paddingTop: '2rem' }}>
              HOME
            </h2>
          </Link>
          <div className={link_container}>
            <Link to={'/schools'}>
              <h3 className={link}>Schools</h3>
            </Link>
            <div className={link_container}>
              {schools?.edges?.length &&
                schools.edges.map((school) => (
                  <div key={school._id}>
                    <Link to={`/schools/${school.node.slug.current}`} key={school.node._id}>
                      {school.node.title}
                    </Link>
                    <div className={link_container}>
                      {students?.edges?.length &&
                        students.edges.map(
                          (student) =>
                            student.node?.school?._id === school.node._id && (
                              <Link
                                to={`/schools/${school.node.slug.current}/${student.node.slug.current}`}
                                key={student.node._id}
                              >
                                {student.node.name}
                              </Link>
                            )
                        )}
                    </div>
                  </div>
                ))}
            </div>
            <Link to={'/thesis-projects'}>
              <h3 className={link}>Thesis Projects</h3>
            </Link>
            <Link to={'/resources'}>
              <h3 className={link}>Resources</h3>
            </Link>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default SiteMap;