import { graphql } from 'gatsby';
export const queryProject = graphql`
  fragment Project on SanityProject {
    id
    title
    subTitle
    type
    school {
      slug {
        current
      }
      title
      hiringCompanies {
        ...HiringCompanies
      }
    }
    slug {
      current
    }
    heroImage {
      ... on SanityFigure {
        ...Figure
      }
      ... on SanityVideo {
        ...Video
      }
    }
    awards
    media {
      ... on SanityFigure {
        ...Figure
      }
      ... on SanityVideo {
        ...Video
      }
      ... on SanityFileUpload {
        ...FileUpload
      }
    }
    instructors
    members {
      person {
        ...Student
      }
    }
    _rawAdditionalInfo
    _rawDescription
    _rawIntro
    publishedAt
  }
`;
