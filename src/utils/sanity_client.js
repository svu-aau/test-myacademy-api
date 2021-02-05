import sanityClient from '@sanity/client';

const writeToken =
  'skpwsCrd58hlPtOSJCrUlyThNtGyMvRf3nWDxIpByIgRVYwA4NhOYeBKv3fYQfmfgnuWSW40D1qz8YgwHQl68Ph7wN2Ozw0rC13gQCkYywweawocbK3flKNnwLNXbjUeez0BUl0ERmKbK1IbO0oXJCEq7ZYIEAeM3azSV5M7oFHbZ33HsSI6';

const client = sanityClient({
  projectId: 'uvdp4b76',
  dataset: process.env.GATSBY_SANITY_DATASET,
  // a token with write access
  token: writeToken,
  useCdn: false,
});

export default client;
