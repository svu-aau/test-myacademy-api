import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment LibraryProfile on SanitySectionLibraryProfile {
    __typename
    _key
    _type
    alt
    backgroundColor {
      _key
      _type
      title
      value
    }
    profileImage {
      alt
      asset {
        ... on SanityImageAsset {
          _id
          url
          gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
        }
      }
    }
    profileName
    profileJob
    profileDesc
    contactBtnText
    link
    route {
      ... on SanityPage {
        slug {
          current
        }
        title
      }
    }
  }
`;
