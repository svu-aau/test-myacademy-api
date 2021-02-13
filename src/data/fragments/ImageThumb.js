import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment ImageThumb on SanityImage {
    _key
    _type
    asset {
      ... on SanityImageAsset {
        _id
        url
        fluid(maxWidth: 500) {
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
