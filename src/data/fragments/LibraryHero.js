import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment LibraryHero on SanitySectionLibraryHero {
    __typename
    _key
    _type
    heroTitle
    backgroundImage {
      asset {
        ... on SanityImageAsset {
          _id
          url
          gatsbyImageData(layout: FULL_WIDTH, width: 2200, placeholder: NONE)
        }
      }
      alt
    }
  }
`;
