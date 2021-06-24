import { graphql } from 'gatsby';
export const queryFigure = graphql`
  fragment FigureThumb on SanityFigure {
    _key
    _type
    alt
    caption
    isHeadShot
    image {
      ...ImageThumb
    }
    link
    _rawDescription
    assetCategory {
      title
    }
  }
`;
