import { graphql } from 'gatsby';
export const queryProject = graphql`
  fragment ProjectPreview on SanityProject {
    id
    title
    subTitle
    type
    school {
      slug {
        current
      }
      title
    }
    slug {
      current
    }
    heroImage {
      ... on SanityFigure {
        ...FigureThumb
      }
      ... on SanityVideo {
        ...Video
      }
    }
    media {
      ... on SanityFigure {
        ...FigureThumb
      }
      ... on SanityVideo {
        ...Video
      }
      ... on SanityFileUpload {
        ...FileUpload
      }
    }
    members {
      person {
        ...Student
      }
    }
    _rawIntro
    publishedAt
  }
`;
