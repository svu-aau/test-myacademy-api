import { graphql } from 'gatsby';
export const queryModalGrid = graphql`
  fragment ModalGrid on SanitySectionImageModalGrid {
    __typename
    _key
    _type
    title
    description: _rawDescription(resolveReferences: { maxDepth: 10 })
    grids {
      title
      subtitle
      contentArray: contentArray {
        ... on SanitySectionCard {
          __typename
          _key
          narrowWidth
          _rawBody(resolveReferences: { maxDepth: 10 })
          _rawBodyRight(resolveReferences: { maxDepth: 10 })
          backgroundColor {
            _key
            _type
            title
            value
          }
        }
        ... on SanitySectionLibraryImageCarousel {
          __typename
          _key
          ...LibraryCarousel
        }
      }
      media {
        ... on SanityImageItem {
          id: _key
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
  }
`;
