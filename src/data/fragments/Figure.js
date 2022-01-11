import { graphql } from 'gatsby';
export const queryFigure = graphql`
  fragment Figure on SanityFigure {
    _key
    _type
    alt
    caption
    link
    image {
      ...Image
    }
  }
`;
