import { graphql } from 'gatsby';
export const queryFileUpload = graphql`
  fragment FileUpload on SanityFileUpload {
    _key
    _type
    caption
    file {
      asset {
        extension
        url
        mimeType
        size
        originalFilename
      }
    }
    title
    _rawDescription
    assetCategory {
      title
    }
  }
`;
