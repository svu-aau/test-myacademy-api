import { graphql } from 'gatsby';
export const querySchool = graphql`
  fragment School on SanitySchool {
    _id
    title
    heroImage {
      asset {
        ... on SanityImageAsset {
          _id
          url
          gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
        }
      }
    }
    heroTitle
    columnData {
      _key
      narrowWidth
      _rawBody(resolveReferences: { maxDepth: 10 })
      _rawBodyRight(resolveReferences: { maxDepth: 10 })
      backgroundColor {
        _key
        _type
        title
        value
      }
    }
    slug {
      current
    }
  }
`;
