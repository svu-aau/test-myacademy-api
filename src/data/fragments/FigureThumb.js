import { graphql } from 'gatsby';
export const queryFigure = graphql`
  fragment FigureThumb on SanityFigure {
    _key
    _type
    alt
    caption
    image {
      ...ImageThumb
    }
    link
  }
`;
