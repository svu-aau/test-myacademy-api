import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment LibraryProfile on SanitySectionLibraryProfile {
    __typename
    _key
    _type
    profileTitle
    backgroundColor {
      _key
      _type
      title
      value
    }
    profileImage {
      asset {
        ... on SanityImageAsset {
          _id
          url
          gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
        }
      }
    }
    alt
    profileTitle
    profileName
    profileJob
    profileDesc
    profileLink
  }
`;
