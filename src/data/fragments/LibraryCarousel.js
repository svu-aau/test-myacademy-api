import { graphql } from 'gatsby';
export const queryFigure = graphql`
  fragment LibraryCarousel on SanitySectionLibraryImageCarousel {
    _key
    title
    carouselImages {
      ... on SanityImageItem {
        id: _key
        title
        caption
        alt
        image {
          ...Image
        }
        link
      }
    }
    description: _rawDescription
  }
`;
