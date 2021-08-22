import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment ImageThumb on SanityImage {
    _key
    _type
    asset {
      ... on SanityImageAsset {
        _id
        url
        gatsbyImageData(layout: FULL_WIDTH)
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
