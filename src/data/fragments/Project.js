import { graphql } from 'gatsby';
export const queryProject = graphql`
  fragment Project on SanityProject {
    id
    title
    student
    videoSpotlight
    downloadLink
    _rawGallery
    school {
      slug {
        current
      }
      title
    }
    slug {
      current
    }
    gallery {
      ... on SanityImage {
        ...Image
      }
    }
    publishedAt
  }
`;
