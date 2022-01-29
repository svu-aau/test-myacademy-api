import { graphql } from 'gatsby';
export const queryFigure = graphql`
  fragment Tabs on SanitySectionTabs {
    _key
    title
    tabs {
      title
      tabContent: _rawTabContent
    }
    description: _rawDescription
  }
`;
