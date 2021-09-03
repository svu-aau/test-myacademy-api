import React from 'react';
import { graphql, Link } from 'gatsby';

import SectionLibraryHero from '../components/pagebuilder/section-library-hero';
import Container from '../components/layout/container';
import BlockContent from '../components/block-content';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import Section from '../components/sections/section';
import { breadcrumbLinkSeperator, breadcrumb } from '../components/layout/layout.module.css';
import * as serializerStyles from '../components/serializers.module.css';

export const query = graphql`
  query SchoolTemplateQuery($id: String!) {
    school: sanitySchool(id: { eq: $id }) {
      ...School
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

  // console.log('school', school);

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
                {students?.nodes?.map((student) => (
                  <div key={student._id}>
                    <Link
                      to={`/schools/${school?.slug?.current}/${student?.slug?.current}`}
                      className={serializerStyles.link}
                    >
                      {student.name}
                    </Link>
                    {student?.projects?.length && student.projects.map((proj) => <p key={proj._id}>{proj.title}</p>)}
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
