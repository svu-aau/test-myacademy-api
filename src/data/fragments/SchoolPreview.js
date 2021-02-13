import { graphql } from 'gatsby';
export const querySchool = graphql`
  fragment SchoolPreview on SanitySchool {
    id
    title
    _rawIntro
    slug {
      current
    }
    heroImage {
      ...ImageThumb
    }
  }
`;
