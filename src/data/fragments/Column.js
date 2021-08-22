import { graphql } from 'gatsby';
export const queryFigure = graphql`
  fragment Column on SanitySectionColumn {
    __typename
    _key
    _type
    _id
    backgroundColor
    sectionLeft {
      ... on SanitySectionText {
        _key
        narrowWidth
        _rawBody(resolveReferences: { maxDepth: 10 })
      }

      ... on SanitySectionLibraryCard {
        ...LibraryCard
      }

      ... on SanitySectionLibraryFeatured {
        ...LibraryFeatured
      }
    }
    sectionRight {
      ... on SanitySectionText {
        _key
        narrowWidth
        _rawBody(resolveReferences: { maxDepth: 10 })
      }

      ... on SanitySectionLibraryCard {
        ...LibraryCard
      }

      ... on SanitySectionLibraryFeatured {
        ...LibraryFeatured
      }
    }
  }
`;
