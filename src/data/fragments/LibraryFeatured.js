import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment LibraryFeatured on SanitySectionLibraryFeatured {
    __typename
    _key
    _type
    _rawBody(resolveReferences: { maxDepth: 10 })
    buttonLink
    buttonText
    buttonType
    title
    image {
      asset {
        ... on SanityImageAsset {
          _id
          url
          gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
        }
      }
    }
    rightAligned
  }
`;
