import React from 'react';
import { graphql, Link } from 'gatsby';
import { ImageGrid } from '@aauweb/design-library';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import ContentSections from '../components/pagebuilder/content-sections';
import { breadcrumb, breadcrumbLinkSeperator } from '../components/layout/layout.module.css';
import Section from '../components/sections/section';
import Container from '../components/layout/container';

import { cn } from '../lib/helpers';
import { headerMenuSchools, columnLink, divider, flexThree, column } from './thesis.module.css';

export const query = graphql`
  query ThesisPageQuery {
    gatsby: site {
      config: siteMetadata {
        siteUrl
        title
        description
        userTwitter
      }
    }
    students: allSanityStudent {
      nodes {
        ...Student
      }
    }
    schools: allSanitySchool {
      nodes {
        ...School
      }
    }
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    page: sanityPage(slug: { current: { eq: "thesis" } }) {
      content: contentArray {
        ...PageContent
      }
      title
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
  }
`;

const ThesisProjectsPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const {
    gatsby: { config },
    schools,
    students,
    site,
    page,
  } = data;
  const displaySchools = schools.nodes.sort((a, b) => a.title.localeCompare(b.title));

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  // console.log('students Nodes', students.nodes);
  const formattedProjects = schools.nodes
    .map((school) => ({
      school,
      data: students.nodes
        .filter((student) => student.school.slug.current === school.slug.current)
        .map(({ heroImage, name, slug, projects }) => [
          heroImage && heroImage.asset?.url,
          [name, `/schools/${school.slug.current}/${slug.current}`],
          projects.map(({ title }) => title).join(', '),
        ])
        .sort((a, b) => {
          let nameA = a[1][0].toUpperCase();
          let nameB = b[1][0].toUpperCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        }),
    }))
    .filter(({ data }) => data.length > 0);

  // console.log('data', data);
  // console.log('formattedProjects', formattedProjects);

  return (
    <Layout
      headerBackgroundImage={data.headerBackgroundImage ? data.headerBackgroundImage : data.backgroundImageFallback}
    >
      <SEO
        title={page.seo?.seo_title || site.title || config.title}
        description={page.seo?.meta_description}
        keywords={page.seoKeywords || site.keywords}
        seoImage={page.seoImage?.asset?.gatsbyImageData}
        path={props.location.pathname}
      />

      {page && <ContentSections content={page.content} slug={'home'} />}

      <Section alignReset noPadding>
        <Container>
          <div className={breadcrumb}>
            <Link to={'/'}>HOME</Link>
            <span className={breadcrumbLinkSeperator}>&gt;</span>
            <span>THESIS PROJECTS</span>
          </div>
        </Container>
      </Section>

      <Section noPadding>
        <Container>
          <h3>Quicklinks</h3>
          <div className={cn(headerMenuSchools, flexThree)}>
            <ul className={column}>
              {displaySchools &&
                displaySchools.slice(0, 7).map((school) => (
                  <li className={columnLink} key={school.id}>
                    <a href={`#${school.slug.current}`}>{school.title}</a>
                  </li>
                ))}
            </ul>
            <ul className={column}>
              {displaySchools &&
                displaySchools.slice(7, 14).map((school) => (
                  <li className={columnLink} key={school.id}>
                    <a href={`#${school.slug.current}`}>{school.title}</a>
                  </li>
                ))}
            </ul>
            <ul className={column}>
              {displaySchools &&
                displaySchools.slice(14).map((school) => (
                  <li className={columnLink} key={school.id}>
                    <a href={`#${school.slug.current}`}>{school.title}</a>
                  </li>
                ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section noPaddingTop>
        <Container>
          {formattedProjects.map(({ school, data }, idx) => (
            <>
              <h1>{school.title}</h1>
              <ImageGrid data={data} />
              {idx + 1 < formattedProjects.length && <div className={divider} />}
            </>
          ))}
        </Container>
      </Section>
    </Layout>
  );
};

export default ThesisProjectsPage;
