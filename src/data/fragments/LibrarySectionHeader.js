import { graphql } from 'gatsby';
export const queryImage = graphql`
  fragment LibrarySectionHeader on SanitySectionLibraryHeader {
    __typename
    _key
    _type
    alt
    sectionHeaderImage {
      alt
      asset {
        ... on SanityImageAsset {
          _id
          url
          gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
        }
      }
    }
    _rawSectionHeaderDesc(resolveReferences: { maxDepth: 10 })
    download {
      ...File
    }
    downloadLinkText
  }
`;
