import { graphql } from 'gatsby';
export const queryHiringCompanies = graphql`
  fragment HiringCompanies on SanityHiringCompany {
    _id
    name
    logo {
      asset {
        fluid(maxWidth: 300) {
          ...GatsbySanityImageFluid_noBase64
        }
      }
    }
  }
`;
