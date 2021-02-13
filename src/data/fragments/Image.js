import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment Image on SanityImage {
    _key
    _type
    asset {
      ... on SanityImageAsset {
        _id
        url
        fluid(maxWidth: 1600) {
          ...GatsbySanityImageFluid_noBase64
        }
      }
    }
    crop {
      _key
      _type
      bottom
      left
      right
      top
    }
    hotspot {
      _key
      _type
      height
      width
      x
      y
    }
  }
`;
