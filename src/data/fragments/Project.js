import { graphql } from 'gatsby';
export const queryProject = graphql`
  fragment Project on SanityProject {
    id
    title
    student {
      ...StudentPreview
    }
    videoSpotlight
    download {
      ...File
    }
    gallery {
      asset {
        url
      }
    }
    publishedAt
  }
`;
