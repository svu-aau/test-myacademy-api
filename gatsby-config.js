// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const clientConfig = require('./client-config');
const token = process.env.SANITY_READ_TOKEN;
const isProd = process.env.NODE_ENV === 'production';
// const isGatsbyCloud = process.env.GATSBY_CLOUD || false;

console.info(`[sanity] project: \x1b[35m${clientConfig.sanity.projectId}\x1b[39m`);
console.info(`[sanity] dataset: \x1b[35m${clientConfig.sanity.dataset}\x1b[39m`);

module.exports = {
  siteMetadata: {
    siteUrl: clientConfig.gatsby.siteUrl,
    title: clientConfig.gatsby.siteTitle,
    description: clientConfig.gatsby.siteDescription,
    author: clientConfig.gatsby.author,
    userTwitter: clientConfig.gatsby.userTwitter,
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-zeit-now',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-57744904-1',
        head: true,
        anonymize: true,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/search_results'],
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts-with-attributes`,
      options: {
        fonts: ['Vollkorn:400i', 'Raleway:400,500,700'],
        display: 'swap',
        attributes: {
          rel: 'stylesheet preload prefetch',
        },
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        disableAutoprefixing: false,
        disableMinification: false,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        exclude: ['node_modules', 'bower_components', '.cache', 'public', '.vscode', 'static', 'public'],
        stages: ['develop'],
        emitWarning: true,
        failOnError: false,
      },
    },
  ],
};
