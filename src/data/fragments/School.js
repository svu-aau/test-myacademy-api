import { graphql } from 'gatsby';
export const querySchool = graphql`
  fragment School on SanitySchool {
    _id
    title
    heroImage {
      asset {
        fluid(maxWidth: 1440) {
          ...GatsbySanityImageFluid_noBase64
        }
      }
    }
    heroTitle
    columnData {
      _key
      narrowWidth
      _rawBody(resolveReferences: { maxDepth: 10 })
      _rawBodyRight(resolveReferences: { maxDepth: 10 })
      backgroundColor
    }
    slug {
      current
    }
  }
`;
