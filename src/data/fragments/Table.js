import { graphql } from 'gatsby';
export const queryTable = graphql`
  fragment Table on SanitySectionTable {
    _key
    _type
    title
    hasHeader
    table: _rawTable
  }
`;
