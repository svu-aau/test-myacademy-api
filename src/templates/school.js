import React from 'react';
import { graphql, Link } from 'gatsby';

import SectionLibraryHero from '../components/pagebuilder/section-library-hero';
import Container from '../components/layout/container';
import BlockContent from '../components/block-content';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import Section from '../components/sections/section';
import { breadcrumbLinkSeperator, breadcrumb, schoolStudent } from '../components/layout/layout.module.css';
import * as serializerStyles from '../components/serializers.module.css';

// this school query is a bit unique it pulls students only for display on this page
// for optional custom specification of students to show instead of all
export const query = graphql`
  query SchoolTemplateQuery($id: String!) {
    school: sanitySchool(id: { eq: $id }) {
      _id
      title
      heroImage {
        asset {
          ... on SanityImageAsset {
            _id
            url
            gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
          }
        }
      }
      students {
        _id
        name
        slug {
          current
        }
        projects {
          ... on SanityProject {
            id
            title
            student {
              _id
              name
              slug {
                current
              }
              heroImage {
                ...Image
              }
            }
            videoSpotlight
            download {
              ...File
            }
            gallery {
              asset {
                url
              }
            }
            publishedAt
          }
        }
        heroImage {
          ...Image
        }
      }
      heroTitle
      columnData {
        _key
        narrowWidth
        _rawBody(resolveReferences: { maxDepth: 10 })
        _rawBodyRight(resolveReferences: { maxDepth: 10 })
        backgroundColor
      }
      slug {
        current
      }
      seoImage {
        asset {
          ... on SanityImageAsset {
            _id
            url
            gatsbyImageData(layout: FIXED, width: 1024)
          }
        }
      }
      seoKeywords
      seo {
        focus_keyword
        meta_description
        seo_title
      }
    }
    students: allSanityStudent(
      filter: { school: { id: { eq: $id } } }
      sort: { fields: [projects___title, name], order: ASC }
    ) {
      nodes {
        ...Student
      }
    }
  }
`;

const SchoolTemplate = (props) => {
  const { data, errors } = props;
  const { school, students } = data;

  const { title, heroImage, heroTitle, columnData, slug, seo, seoImage } = school;
  const seoDescription = (seo && seo.meta_description) || '';
  const pageTitle = school.title || 'Untitled';
  const seoTitle = (seo && seo.seo_title) || pageTitle;

  // console.log('school: ', school);
  // console.log('students: ', students);

  let availableStudents = students.nodes.filter((student) => student.projects && student.projects.length);
  // if specific students use them instead
  if (school.students?.length > 0) {
    availableStudents = school.students.filter((student) => student.projects && student.projects.length);
  }

  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {school && (
        <SEO
          title={school.title || 'Untitled'}
          seoTitle={seoTitle}
          description={seoDescription}
          keywords={school.seoKeywords}
          path={props.location.pathname}
          seoImage={seoImage?.asset?.gatsbyImageData}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {heroImage && <SectionLibraryHero section={{ backgroundImage: heroImage, heroTitle: `School of ${title}` }} />}

      <Section alignReset noPadding={heroImage} noPaddingBottom={!heroImage}>
        <Container>
          <div className={breadcrumb}>
            <Link to={'/'}>HOME</Link>
            <span className={breadcrumbLinkSeperator}>&gt;</span>
            <Link to={'/schools'}>Schools</Link>
            <span className={breadcrumbLinkSeperator}>&gt;</span>
            <span>{school.title}</span>
          </div>
        </Container>
      </Section>

      {/* {columnData && <SectionCard section={columnData} noPadding />} */}
      {columnData && (
        <Section key={columnData._key} color={columnData.backgroundColor}>
          <Container narrow={columnData.narrowWidth} split={true}>
            {columnData._rawBody && (
              <div>
                <BlockContent blocks={columnData._rawBody} />
                {availableStudents?.map((student) => (
                  <div key={student._id} className={schoolStudent}>
                    <Link
                      to={`/schools/${school?.slug?.current}/${student?.slug?.current}`}
                      className={serializerStyles.link}
                    >
                      {student.name}
                    </Link>
                    <div>
                      {student?.projects?.length &&
                        student.projects.map((proj, idx) => (
                          <span key={proj._id}>
                            {proj.title}
                            {idx + 1 !== student.projects.length ? ', ' : ''}
                          </span>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {columnData._rawBodyRight && <BlockContent blocks={columnData._rawBodyRight} />}
          </Container>
        </Section>
      )}
    </Layout>
  );
};

export default SchoolTemplate;
