module.exports = {
  sanity: {
    projectId: process.env.GATSBY_SANITY_PROJECT_ID || 'uvdp4b76',
    dataset: process.env.GATSBY_SANITY_DATASET || 'my-academy',
  },
  gatsby: {
    siteTitle: 'AAU My Academy',
    siteDescription: 'Academy of Art University My Academy',
    siteUrl: 'https://my.academyart.edu', // Site domain. Do not include a trailing slash! If you wish to use a path prefix you can read more about that here: https://www.gatsbyjs.org/docs/path-prefix/
    stagingUrl: 'https://aa-myacademy-web.vercel.app', // Site domain. Do not include a trailing slash! If you wish to use a path prefix you can read more about that here: https://www.gatsbyjs.org/docs/path-prefix/
    previewUrl: 'https://preview-aamyacademywebmain.gtsb.io', // Site domain. Do not include a trailing slash! If you wish to use a path prefix you can read more about that here: https://www.gatsbyjs.org/docs/path-prefix/
    userTwitter: '@academy_of_art', // Change for Twitter Cards
    author: 'Academy of Art University', // Author for RSS author segment and SEO schema
    authorUrl: 'https://www.academyart.edu', // URL used for author and publisher schema, can be a social profile or other personal site
    shortTitle: 'Academy of Art', // Used for App manifest e.g. Mobile Home Screen
  },
};
