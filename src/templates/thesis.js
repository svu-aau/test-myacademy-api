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

  console.log('schools', schools);
  console.log('projects', projects);

  // http://gradshowcase.academyart.edu/schools/acting/amanda-casarella.html
  // media is project.media
  // school.title or school.slug.current
  // student.school.title

  const formattedProjects = schools.nodes
    .map((school) => ({
      school,
      data: projects.nodes
        .filter((project) => project.school.slug.current === school.slug.current)
        .map(({ gallery, student, slug, title }) => ({
          image: gallery[0],
          name: student,
          slug: slug.current,
          title,
        })),
    }))
    .filter(({ data }) => data.length > 0);

  /*
  const formattedProjects = [
    {
      school: {
        slug: 'acting',
        title: 'Acting',
      },
      data: [
        {
          heroImage: {
            asset: {
              fluid: {
                src: 'https://cdn.sanity.io/images/uvdp4b76/2021-production/53c704471c740629d7b49e1029ac0e94240bc355-2200x1283.jpg?w=1440&h=840&fit=crop',
              },
            },
          },
          name: 'Casarella, Amanda',
          slug: 'amanda-casarella',
          title: 'Final Review - Demo Reel (Video)',
        },
        {
          heroImage: {
            asset: {
              fluid: {
                src: 'https://cdn.sanity.io/images/uvdp4b76/2021-gradshowcase/92b638807289b1901c926a44f40ba5d8f0302a26-2194x846.png?w=1920&h=740&fit=crop',
              },
            },
          },
          name: 'Casarella, Amanda',
          slug: 'amanda-casarella',
          title: 'Final Review - Demo Reel (Video)',
        },
        {
          heroImage: {
            asset: {
              fluid: {
                src: 'https://cdn.sanity.io/images/uvdp4b76/2021-gradshowcase/92b638807289b1901c926a44f40ba5d8f0302a26-2194x846.png?w=1920&h=740&fit=crop',
              },
            },
          },
          name: 'Casarella, Amanda',
          slug: 'amanda-casarella',
          title: 'Final Review - Demo Reel (Video)',
        },
        {
          heroImage: {
            asset: {
              fluid: {
                src: 'https://cdn.sanity.io/images/uvdp4b76/2021-gradshowcase/92b638807289b1901c926a44f40ba5d8f0302a26-2194x846.png?w=1920&h=740&fit=crop',
              },
            },
          },
          name: 'Casarella, Amanda',
          slug: 'amanda-casarella',
          title: 'Final Review - Demo Reel (Video)',
        },
        {
          heroImage: {
            asset: {
              fluid: {
                src: 'https://cdn.sanity.io/images/uvdp4b76/2021-gradshowcase/92b638807289b1901c926a44f40ba5d8f0302a26-2194x846.png?w=1920&h=740&fit=crop',
              },
            },
          },
          name: 'Casarella, Amanda',
          slug: 'amanda-casarella',
          title: 'Final Review - Demo Reel (Video)',
        },
        {
          heroImage: {
            asset: {
              fluid: {
                src: 'https://cdn.sanity.io/images/uvdp4b76/2021-gradshowcase/92b638807289b1901c926a44f40ba5d8f0302a26-2194x846.png?w=1920&h=740&fit=crop',
              },
            },
          },
          name: 'Casarella, Amanda',
          slug: 'amanda-casarella',
          title: 'Final Review - Demo Reel (Video)',
        },
      ],
    },
  ];
  */

  console.log('formattedProjects', formattedProjects);

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
          {formattedProjects.map(({ school, data }) => {
            const arr = data.map(({ image, name, title, slug }) => [
              image.asset.fluid.src,
              [name, `/schools/${school.slug}/${slug}`],
              title,
            ]);

            return (
              <>
                <h1>{school.title}</h1>
                <ImageGrid data={arr} />
              </>
            );
          })}
        </Container>
      </Section>
    </Layout>
  );
};

export default ThesisProjectsPage;
