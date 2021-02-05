import { graphql } from 'gatsby';
export const queryStudent = graphql`
  fragment Student on SanityStudent {
    _id
    id
    name
    slug {
      current
    }
    portfolio {
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
    heroImage {
      ... on SanityFigure {
        ...Figure
      }
      ... on SanityVideo {
        ...Video
      }
    }
    name
    awards
    instructors
    embedCode
    degree {
      id
      title
      code
    }
    externalSiteUrls
    additionalPortfolioUrls
    resume {
      asset {
        extension
        url
      }
    }
    major {
      id
      title
    }
    school {
      ...School
    }
    _rawDescription
    _rawBio
    hiddenProfile
  }
`;
