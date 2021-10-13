import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'uvdp4b76',
  dataset: process.env.GATSBY_SANITY_2021_DATASET,
  // a token with write access
  token: process.env.GATSBY_SANITY_TOKEN,
  useCdn: false,
});

export default client;
