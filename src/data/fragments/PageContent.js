import { graphql } from 'gatsby';
export const queryFigure = graphql`
  fragment PageContent on SanityDocument {
    _id

    ... on Node {
      __typename
    }

    ... on SanitySectionHero {
      _key
      heroTitle
      heroHeading
      backgroundImage {
        asset {
          fluid(maxWidth: 1440) {
            ...GatsbySanityImageFluid_noBase64
          }
        }
      }
      heroImageCaption
    }

    ... on SanitySectionGlobe {
      _key
      title
      body
      infoOne
      infoTwo
    }

    ... on SanitySectionText {
      _key
      narrowWidth
      _rawBody(resolveReferences: { maxDepth: 10 })
    }

    ... on SanitySectionCard {
      _key
      narrowWidth
      _rawBody(resolveReferences: { maxDepth: 10 })
      _rawBodyRight(resolveReferences: { maxDepth: 10 })
      backgroundColor
    }

    ... on SanitySectionSchoolsGrid {
      _key
      narrowWidth
      _rawIntro(resolveReferences: { maxDepth: 10 })
      _rawOutro(resolveReferences: { maxDepth: 10 })
      backgroundColor
      schools {
        ...SchoolPreview
      }
    }

    ... on SanitySectionImageGrid {
      _key
      narrowWidth
      _rawIntro(resolveReferences: { maxDepth: 10 })
      _rawOutro(resolveReferences: { maxDepth: 10 })
      backgroundColor
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
      _key
      narrowWidth
      _rawIntro(resolveReferences: { maxDepth: 10 })
      _rawOutro(resolveReferences: { maxDepth: 10 })
      backgroundColor
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

    ... on SanitySectionProjectsGrid {
      _key
      narrowWidth
      _rawIntro(resolveReferences: { maxDepth: 10 })
      _rawOutro(resolveReferences: { maxDepth: 10 })
      backgroundColor
      showFilters
      showPagination
      linkOverride
      limitResults
      gridStyle
      projects {
        ...Project
      }
      school {
        __typename
        id
        title
        slug {
          current
        }
      }
    }

    ... on SanitySectionProjectGrid {
      _key
      narrowWidth
      _rawIntro(resolveReferences: { maxDepth: 10 })
      _rawOutro(resolveReferences: { maxDepth: 10 })
      backgroundColor
      showFilters
      showPagination
      linkOverride
      limitResults
      gridStyle
      projects {
        ...Project
      }
      school {
        __typename
        id
        title
        slug {
          current
        }
      }
    }

    ... on SanitySectionIndustryGrid {
      _key
      _rawIntro(resolveReferences: { maxDepth: 10 })
      companies {
        ...HiringCompanies
      }
      backgroundColor
      limitResults
    }

    ... on SanitySectionGlobe {
      _key
      title
      body
      infoOne
      infoTwo
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

    ... on SanitySectionLibraryHero {
      ...LibraryHero
    }

    ... on SanitySectionColumn {
      ...Column
    }
  }
`;
