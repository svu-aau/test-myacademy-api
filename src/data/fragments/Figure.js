import { graphql } from 'gatsby';
export const queryFigure = graphql`
  fragment Figure on SanityFigure {
    _key
    _type
    alt
    caption
    credit
    medium
    link
    height
    width
    depth
    isHeadShot
    image {
      ...Image
    }
    _rawDescription
  }
`;
