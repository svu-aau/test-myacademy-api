/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: { fs: 'empty' },
  });
};

async function createAllSchoolsPage(actions, reporter) {
  const { createPage } = actions;
  const path = `/schools/`;

  reporter.info(`Creating schools page: ${path}`);

  createPage({
    path,
    component: require.resolve('./src/templates/all-schools.js'),
  });
}

async function createThesisProjectsPage(actions, reporter) {
  const { createPage } = actions;
  const path = `/thesis-projects`;

  reporter.info(`Creating thesis page: ${path}`);

  createPage({
    path,
    component: require.resolve('./src/templates/thesis.js'),
  });
}

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
      students: allSanityStudent(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            slug {
              current
            }
            projects {
              ... on SanityProject {
                _id
              }
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

  const studentEdges = (result.data.students || {}).edges || [];

  studentEdges.forEach((edge) => {
    const project = edge.node.projects[0];
    const slug = edge.node.slug.current;
    if (project) {
      const id = project._id;

      if (edge.node.school && edge.node.school.slug) {
        const schoolSlug = edge.node.school.slug.current;
        const path = `/schools/${schoolSlug}/${slug}/`;
        reporter.info(`Creating project page: ${path}`);

        createPage({
          path,
          component: require.resolve('./src/templates/project.js'),
          context: { id },
        });
      }
      if (process.env.NODE_ENV === 'development') {
        // Create page at short url for previews
        const path = `/projects/${id}/`;
        reporter.info(`Creating project page: ${path}`);
        createPage({
          path,
          component: require.resolve('./src/templates/project.js'),
          context: { id },
        });
      }
    }
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
  await createAllSchoolsPage(actions, reporter);
  await createThesisProjectsPage(actions, reporter);
  await createSchoolPages(graphql, actions, reporter);
  await createProjectPages(graphql, actions, reporter);
  await createPageBuilderPages(graphql, actions, reporter);
};
