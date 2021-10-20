import { graphql } from 'gatsby';
export const queryFigure = graphql`
  fragment EmbeddedMenu on SanityMenu {
    title
    links {
      _key
      title
      href
      hidden
    }
  }
`;
