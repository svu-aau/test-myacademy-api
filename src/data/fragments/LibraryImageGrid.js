import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment LibraryImageGrid on SanitySectionLibraryImageGrid {
    __typename
    _key
    _type
    title
    imageItem {
      ... on SanityImageItem {
        _rawDescription(resolveReferences: { maxDepth: 10 })
        title
        caption
        alt
        image {
          ...Image
        }
        link
      }
    }
  }
`;
