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

const formatText = (content) => {
  let textArray = [];
  if (content?.body) {
    content.body.forEach(({ children }) => {
      if (children) {
        children.forEach(({ text }) => {
          if (text) {
            textArray.push(text);
          }
        });
      }
    });
  } else if (Array.isArray(content)) {
    if (content.length > 0) {
      content.forEach((inner) => {
        if (inner.body) {
          inner.body.forEach(({ children }) => {
            if (children) {
              children.forEach(({ text }) => {
                if (text) {
                  textArray.push(text);
                }
              });
            }
          });
        }
      });
    }
  }

  return textArray;
};

const pageMap = (props) => {
  const { content, slug } = props;
  const tempProps = props;
  delete tempProps.content;
  return {
    ...tempProps,
    body: formatText(content),
    slug: slug.current,
  };
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

async function createSearchPage(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      pages: allSanityPage(filter: { slug: { current: { ne: null } } }) {
        nodes {
          content: contentArray {
            ... on SanitySectionText {
              body {
                children {
                  text
                }
              }
            }
            ... on SanityGlobalSection {
              subTitle
              content: contentArray {
                ... on SanitySectionText {
                  body {
                    children {
                      text
                    }
                  }
                }
              }
            }
            ... on SanitySectionCard {
              body {
                children {
                  text
                }
              }
            }
          }
          id
          slug {
            current
          }
          title
        }
      }
    }
  `);

  if (result.errors) throw result.errors;
  const pageNodes = (result.data.pages || {}).nodes || [];

  const formattedPageEdges = pageNodes.map((page) => {
    if (page) {
      return pageMap(page);
    }
  });

  const edges = [...formattedPageEdges];

  const path = `/search_results/`;

  reporter.info(`Creating search page: ${path}`);

  createPage({
    path,
    component: require.resolve('./src/templates/search.js'),
    context: {
      pageData: {
        allPages: edges,
      },
    },
  });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createPageBuilderPages(graphql, actions, reporter);
  await createSearchPage(graphql, actions, reporter);
};
