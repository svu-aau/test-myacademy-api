import { graphql } from 'gatsby';
export const queryGameDemos = graphql`
  fragment GameDemos on SanityGameDemos {
    _id
    title
    heroImage {
      ...Image
    }
    embedCode
    _rawIntro
    owner {
      name
      slug {
        current
      }
      school {
        slug {
          current
        }
      }
    }
    _rawAdditionalCredit
    platform
  }
`;
