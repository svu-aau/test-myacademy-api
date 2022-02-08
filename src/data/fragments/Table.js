import { graphql } from 'gatsby';
export const queryTable = graphql`
  fragment Table on SanitySectionTable {
    __typename
    _key
    title
    hasHeader
    table: _rawTable(resolveReferences: { maxDepth: 10 })
  }
`;
