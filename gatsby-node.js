/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: { fs: 'empty' },
    // fix pdf js ssr build issue with missing canvas
    resolve: {
      alias: {
        canvas: false,
        encoding: false,
      },
    },
  });
};

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
  await createPageBuilderPages(graphql, actions, reporter);
};
