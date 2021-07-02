import React from 'react';
import { graphql, Link } from 'gatsby';
import { ImageGrid } from '@aauweb/design-library';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/layout/seo';
import Layout from '../containers/layout';
import ContentSections from '../components/pagebuilder/content-sections';
import layoutStyles from '../components/layout/layout.module.css';
import Section from '../components/sections/section';
import Container from '../components/layout/container';

import { cn } from '../lib/helpers';
import styles from './thesis.module.css';
import ProjectsGrid from '../components/projects/projects-grid';

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
    projects: allSanityProject {
      nodes {
        ...Project
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
    page: sanityPage(slug: { current: { eq: "thesis-projects" } }) {
      content: contentArray {
        ...PageContent
      }
      title
      seoImage {
        asset {
          _id
          url
          img: fixed(width: 1024) {
            width
            height
            src
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
    projects,
    site,
    page,
  } = data;
  const displaySchools = schools.nodes.sort((a, b) => a.title.localeCompare(b.title));

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const formattedProjects = schools.nodes
    .map((school) => ({
      school,
      data: projects.nodes
        .filter((project) => project.school.slug.current === school.slug.current)
        .map(({ gallery, student, slug, title }) => [
          gallery[0] && gallery[0].asset.fluid.src,
          [student, `/schools/${school.slug.current}/${slug.current}`],
          title,
        ]),
    }))
    .filter(({ data }) => data.length > 0);

  return (
    <Layout
      headerBackgroundImage={data.headerBackgroundImage ? data.headerBackgroundImage : data.backgroundImageFallback}
    >
      <SEO
        title={page.seo.seo_title || site.title || config.title}
        description={page.seo.meta_description}
        keywords={page.seoKeywords || site.keywords}
        seoImage={page.seoImage?.asset?.img?.src}
        path={props.location.pathname}
      />

      {page && <ContentSections content={page.content} slug={'home'} />}

      <Section alignReset noPadding>
        <Container>
          <div className={layoutStyles.breadcrumb}>
            <Link to={'/'}>HOME</Link>
            <span className={layoutStyles.breadcrumbLinkSeperator}>&gt;</span>
            <Link to="/thesis-projects">THESIS PROJECTS</Link>
          </div>
        </Container>
      </Section>

      <Section noPadding>
        <Container>
          <h3>Quicklinks</h3>
          <div className={cn(styles.headerMenuSchools, styles.flexThree)}>
            <ul className={styles.column}>
              {displaySchools &&
                displaySchools.slice(0, 7).map((school) => (
                  <li className={styles.columnLink} key={school.id}>
                    <Link to={`/schools/${school.slug.current}`} onClick={() => setDrawerOpen(false)}>
                      {school.title}
                    </Link>
                  </li>
                ))}
            </ul>
            <ul className={styles.column}>
              {displaySchools &&
                displaySchools.slice(7, 14).map((school) => (
                  <li className={styles.columnLink} key={school.id}>
                    <Link to={`/schools/${school.slug.current}`} onClick={() => setDrawerOpen(false)}>
                      {school.title}
                    </Link>
                  </li>
                ))}
            </ul>
            <ul className={styles.column}>
              {displaySchools &&
                displaySchools.slice(14).map((school) => (
                  <li className={styles.columnLink} key={school.id}>
                    <Link to={`/schools/${school.slug.current}`} onClick={() => setDrawerOpen(false)}>
                      {school.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section noPaddingTop>
        <Container>
          {formattedProjects.map(({ school, data }) => (
            <>
              <h1>{school.title}</h1>
              <ImageGrid data={data} />
            </>
          ))}
        </Container>
      </Section>
    </Layout>
  );
};

export default ThesisProjectsPage;
