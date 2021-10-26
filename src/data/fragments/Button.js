import { graphql } from 'gatsby';
export const queryFigure = graphql`
  fragment Button on SanityButton {
    title
    buttonStyle

    # external link
    link

    # or internal link
    route {
      ... on SanityPage {
        slug {
          current
        }
        title
      }
    }
  }
`;
