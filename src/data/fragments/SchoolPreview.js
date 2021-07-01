import { graphql } from 'gatsby';
export const querySchool = graphql`
  fragment SchoolPreview on SanitySchool {
    id
    title
    slug {
      current
    }
    heroImage {
      ...ImageThumb
    }
  }
`;
