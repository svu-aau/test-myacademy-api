import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment LibraryCard on SanitySectionLibraryCard {
    _key
    _type
    _rawCaption(resolveReferences: { maxDepth: 10 })
    title
    href
    heroImage {
      asset {
        fluid(maxWidth: 800) {
          ...GatsbySanityImageFluid_noBase64
        }
      }
      alt
    }
  }
`;
