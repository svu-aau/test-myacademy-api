import { graphql } from 'gatsby';
export const queryFigure = graphql`
  fragment Tabs on SanitySectionTabs {
    _key
    title
    tabs {
      title
      hasTableHeader
      tabContent: _rawTabContent(resolveReferences: { maxDepth: 10 })
      tabTable: _rawTabTable(resolveReferences: { maxDepth: 10 })
      tabBottomContent: _rawTabBottomContent(resolveReferences: { maxDepth: 10 })
    }
    description: _rawDescription(resolveReferences: { maxDepth: 10 })
  }
`;
