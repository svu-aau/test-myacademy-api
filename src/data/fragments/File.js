import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment File on SanityFile {
    asset {
      _type
      url
    }
  }
`;
