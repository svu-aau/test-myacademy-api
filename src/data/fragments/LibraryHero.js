import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment LibraryHero on SanitySectionLibraryHero {
    _key
    _type
    backgroundImage {
      asset {
        fluid(maxWidth: 1920) {
          ...GatsbySanityImageFluid_noBase64
        }
      }
    }
  }
`;
