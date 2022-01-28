import { graphql } from 'gatsby';
export const queryFigure = graphql`
  fragment PageContent on SanityDocument {
    _id

    ... on Node {
      __typename
    }

    ... on SanitySectionHero {
      __typename
      _key
      heroTitle
      heroHeading
      backgroundImage {
        asset {
          ... on SanityImageAsset {
            _id
            url
            gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
          }
        }
      }
      heroImageCaption
    }

    ... on SanitySectionText {
      __typename
      _key
      narrowWidth
      _rawBody(resolveReferences: { maxDepth: 10 })
    }

    ... on SanitySectionCard {
      __typename
      _key
      narrowWidth
      _rawBody(resolveReferences: { maxDepth: 10 })
      _rawBodyRight(resolveReferences: { maxDepth: 10 })
      backgroundColor {
        _key
        _type
        title
        value
      }
    }

    ... on SanitySectionImageGrid {
      __typename
      _key
      narrowWidth
      _rawIntro(resolveReferences: { maxDepth: 10 })
      _rawOutro(resolveReferences: { maxDepth: 10 })
      backgroundColor {
        _key
        _type
        title
        value
      }
      showPagination
      linkOverride
      limitResults
      media {
        ... on SanityFigure {
          ...FigureThumb
        }
      }
      gridStyle
    }

    ... on SanitySectionMediaGrid {
      __typename
      _key
      narrowWidth
      _rawIntro(resolveReferences: { maxDepth: 10 })
      _rawOutro(resolveReferences: { maxDepth: 10 })
      backgroundColor {
        _key
        _type
        title
        value
      }
      showPagination
      linkOverride
      limitResults
      media {
        ... on SanityFigure {
          ...FigureThumb
        }
        ... on SanityVideo {
          ...Video
        }
      }
      gridStyle
    }

    ... on SanitySectionIndustryGrid {
      __typename
      _key
      _rawIntro(resolveReferences: { maxDepth: 10 })
      companies {
        ...HiringCompanies
      }
      backgroundColor {
        _key
        _type
        title
        value
      }
      limitResults
    }

    ... on SanityGlobalSection {
      ...GlobalSection
    }

    ... on SanitySectionLibraryCard {
      ...LibraryCard
    }

    ... on SanitySectionLibraryFeatured {
      ...LibraryFeatured
    }

    ... on SanitySectionLibraryImageGrid {
      ...LibraryImageGrid
    }

    ... on SanitySectionLibraryHero {
      ...LibraryHero
    }

    ... on SanitySectionLibraryProfile {
      ...LibraryProfile
    }

    ... on SanitySectionLibraryHeader {
      ...LibrarySectionHeader
    }

    ... on SanitySectionColumn {
      ...Column
    }

    ... on SanitySectionLibraryAccordion {
      ...LibraryAccordion
    }
  }
`;
