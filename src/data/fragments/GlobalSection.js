import { graphql } from 'gatsby';
export const queryGlobalSection = graphql`
  fragment GlobalSection on SanityGlobalSection {
    _id
    slug {
      current
    }
    subTitle
    content: contentArray {
      ... on SanitySectionText {
        __typename
        _key
        _rawBody(resolveReferences: { maxDepth: 10 })
      }

      ... on SanitySectionCard {
        __typename
        _key
        narrowWidth
        _rawBody(resolveReferences: { maxDepth: 10 })
        _rawBodyRight(resolveReferences: { maxDepth: 10 })
        backgroundColor
      }

      ... on SanitySectionMediaGrid {
        __typename
        _key
        linkOverride
        backgroundColor
        showPagination
        media {
          ... on SanityVideo {
            ...Video
          }
          ... on SanityFigure {
            ...FigureThumb
          }
        }
      }
    }
  }
`;
