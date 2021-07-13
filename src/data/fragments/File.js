import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment File on SanityFile {
    asset {
      _key
      _type
      url
    }
  }
`;
