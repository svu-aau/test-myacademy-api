import { graphql } from 'gatsby';
export const queryGlobalSection = graphql`
  fragment GlobalSection on SanityGlobalSection {
    _id
    subTitle
    content: contentArray {
      ... on SanitySectionText {
        _key
        _rawBody(resolveReferences: { maxDepth: 10 })
      }

      ... on SanitySectionCard {
        _key
        narrowWidth
        _rawBody(resolveReferences: { maxDepth: 10 })
        backgroundColor
      }

      ... on SanitySectionMediaGrid {
        _key
        linkOverride
        backgroundColor
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
