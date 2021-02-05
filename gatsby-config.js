// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const clientConfig = require('./client-config');
const token = process.env.SANITY_READ_TOKEN;
const isProd = process.env.NODE_ENV === 'production';

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
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: [
          `Array.prototype.map`,
          `Array.prototype.flat`,
          `Array.prototype.find`,
          `Array.prototype.findIndex`,
          `Element.prototype.scroll`,
          `Element.prototype.scrollIntoView`,
        ],
      },
    },
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
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: false, // !isProd && token,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: ['Vollkorn:400i', 'Raleway:400,500,700'],
        display: 'swap',
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
        exclude: /(node_modules|.cache|.now|.vscode|static|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
  ],
};
