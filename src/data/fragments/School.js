import { graphql } from 'gatsby';
export const querySchool = graphql`
  fragment School on SanitySchool {
    id
    title
    _rawIntro
    slug {
      current
    }
    heroImage {
      ...Image
    }
    hiringCompanies {
      ...HiringCompanies
    }
  }
`;
