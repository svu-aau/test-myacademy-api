import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment LibraryFeatured on SanitySectionLibraryFeatured {
    _key
    _type
    _rawBody(resolveReferences: { maxDepth: 10 })
    buttonLink
    buttonText
    buttonType
    title
    image {
      asset {
        fluid(maxWidth: 800) {
          ...GatsbySanityImageFluid_noBase64
        }
      }
    }
  }
`;
