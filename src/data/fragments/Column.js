import { graphql } from 'gatsby';
export const queryFigure = graphql`
  fragment Column on SanitySectionColumn {
    __typename
    _key
    _type
    _id
    title
    backgroundColor {
      _key
      _type
      title
      value
    }
    _rawSectionLeft(resolveReferences: { maxDepth: 10 })
    _rawSectionRight(resolveReferences: { maxDepth: 10 })
    _rawSectionThird(resolveReferences: { maxDepth: 10 })
    buttonText
    link
    route {
      ... on SanityPage {
        slug {
          current
        }
        title
      }
    }
  }
`;
