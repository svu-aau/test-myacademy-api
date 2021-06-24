import { graphql } from 'gatsby';
export const querySchool = graphql`
  fragment School on SanitySchool {
    _id
    title
    _rawIntro
    _rawGameDemoIntro
    slug {
      current
    }
    heroImage {
      ...Image
    }
    heroImageCaption
    hiringCompanies {
      ...HiringCompanies
    }
    gameDemos {
      ...GameDemos
    }
  }
`;
