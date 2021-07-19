import { graphql } from 'gatsby';
export const queryStudent = graphql`
  fragment StudentPreview on SanityStudent {
    _id
    name
    slug {
      current
    }
    heroImage {
      ...Image
    }
    school {
      ...School
    }
  }
`;
