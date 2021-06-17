import { graphql } from 'gatsby';
export const queryStudent = graphql`
  fragment StudentPreview on SanityStudent {
    _id
    id
    name
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
    name
    school {
      slug {
        current
      }
      title
    }
    country {
      code
      title
    }
    major {
      id
      title
    }
    _rawDescription
    _rawBio
    hiddenProfile
    portfolio {
      ... on SanityFigure {
        ...FigureThumb
      }
      ... on SanityFileUpload {
        ...FileUpload
      }
      ... on SanityVideo {
        ...Video
      }
    }
  }
`;
