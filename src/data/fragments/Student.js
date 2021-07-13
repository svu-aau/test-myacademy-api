import { graphql } from 'gatsby';
export const queryStudent = graphql`
  fragment Student on SanityStudent {
    _id
    name
    slug {
      current
    }
    projects {
      ... on SanityProject {
        ...Project
      }
    }
    heroImage {
      ...Image
    }
    school {
      ...School
    }
  }
`;
