import { graphql } from 'gatsby';
export const queryFigure = graphql`
  fragment Column on SanitySectionColumn {
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

      ... on SanitySectionLibraryFeatured {
        ...LibraryFeatured
      }
    }
  }
`;
