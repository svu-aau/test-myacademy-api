import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment LibraryCard on SanitySectionLibraryCard {
    __typename
    _key
    _type
    _rawCaption(resolveReferences: { maxDepth: 10 })
    title
    href
    heroImage {
      asset {
        ... on SanityImageAsset {
          _id
          url
          gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
        }
      }
      alt
    }
  }
`;
