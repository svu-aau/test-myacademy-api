import { graphql } from 'gatsby';
export const queryVideo = graphql`
  fragment Video on SanityVideo {
    _key
    _rawDescription
    _type
    caption
    title
    url
    assetCategory {
      title
    }
  }
`;
