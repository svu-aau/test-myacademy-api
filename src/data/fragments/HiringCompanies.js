import { graphql } from 'gatsby';
export const queryHiringCompanies = graphql`
  fragment HiringCompanies on SanityHiringCompany {
    _id
    name
    logo {
      asset {
        ... on SanityImageAsset {
          _id
          url
          gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
        }
      }
    }
  }
`;
