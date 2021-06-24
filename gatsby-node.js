const { isFuture } = require('date-fns');

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-globe.gl/,
            use: loaders.null(),
          },
        ],
      },
      node: { fs: 'empty' },
    });
  }

  actions.setWebpackConfig({
    node: { fs: 'empty' },
  });
};

async function createSchoolPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      schools: allSanitySchool(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const schoolEdges = (result.data.schools || {}).edges || [];

  schoolEdges.forEach((edge) => {
    const id = edge.node.id;
    const slug = edge.node.slug.current;
    const path = `/schools/${slug}/`;

    reporter.info(`Creating school page: ${path}`);

    createPage({
      path,
      component: require.resolve('./src/templates/school.js'),
      context: { id },
    });
  });
}

async function createProjectPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      projects: allSanityProject(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
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
    }
  `);

  if (result.errors) throw result.errors;

  const projectEdges = (result.data.projects || {}).edges || [];

  projectEdges.forEach((edge) => {
    const id = edge.node.id;
    const slug = edge.node.slug.current;
    if (edge.node.school && edge.node.school.slug) {
      const schoolSlug = edge.node.school.slug.current;
      const path = `/schools/${schoolSlug}/projects/${slug}/`;
      reporter.info(`Creating project page: ${path}`);

      createPage({
        path,
        component: require.resolve('./src/templates/project.js'),
        context: { id },
      });
    }
    if (process.env.NODE_ENV === 'development') {
      // Create page at short url for previews
      createPage({
        path: `/projects/${slug}/`,
        component: require.resolve('./src/templates/project.js'),
        context: { id },
      });
    }
  });
}

async function createAllProjectPages(graphql, actions, reporter) {
  const { createPage } = actions;
  createPage({
    path: '/projects',
    component: require.resolve('./src/templates/all-projects.js'),
  });
}

async function createStudentProfilePages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      studentProfiles: allSanityStudent(filter: { slug: { current: { ne: null } }, hiddenProfile: { ne: true } }) {
        edges {
          node {
            id
            slug {
              current
            }
            name
            school {
              slug {
                current
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const studentProfileEdges = (result.data.studentProfiles || {}).edges || [];

  studentProfileEdges.forEach((edge) => {
    const id = edge.node.id;
    const slug = edge.node.slug.current;
    if (edge.node.school) {
      const schoolSlug = edge.node.school.slug.current;
      const path = `/schools/${schoolSlug}/students/${slug}/`;

      reporter.info(`Creating student profile page: ${path}`);

      createPage({
        path,
        component: require.resolve('./src/templates/student.js'),
        context: { id },
      });
    }

    if (process.env.NODE_ENV === 'development') {
      // Create page at short url for previews
      reporter.info(`Creating preview student profile page: /students/${slug}/`);
      createPage({
        path: `/students/${slug}/`,
        component: require.resolve('./src/templates/student.js'),
        context: { id },
      });
    }
  });
}

async function createGlobalWorksPage(graphql, actions, reporter) {
  const { createPage } = actions;
  createPage({
    path: '/global',
    component: require.resolve('./src/templates/global.js'),
  });
}

async function createStudentIndexPage(graphql, actions, reporter) {
  const { createPage } = actions;
  createPage({
    path: '/students',
    component: require.resolve('./src/templates/all-students.js'),
  });
}

async function createPageBuilderPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      pages: allSanityPage(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const edges = (result.data.pages || {}).edges || [];

  edges.forEach((edge) => {
    const id = edge.node.id;
    const slug = edge.node.slug.current;
    const path = `/${slug}/`;

    reporter.info(`Creating page-builder page: ${path}`);

    createPage({
      path,
      component: require.resolve('./src/templates/page.js'),
      context: { id },
    });
  });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createSchoolPages(graphql, actions, reporter);
  await createProjectPages(graphql, actions, reporter);
  await createAllProjectPages(graphql, actions, reporter);
  await createStudentIndexPage(graphql, actions, reporter);
  await createStudentProfilePages(graphql, actions, reporter);
  await createGlobalWorksPage(graphql, actions, reporter);
  await createPageBuilderPages(graphql, actions, reporter);
};
