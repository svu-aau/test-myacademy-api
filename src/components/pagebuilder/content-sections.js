import SectionCard from './section-card';
import SectionDebug from './section-debug';
import SectionGlobe from './section-globe';
import SectionHero from './section-hero';
import SectionText from './section-text';
import SectionImageGrid from './section-image-grid';
import SectionIndustryGrid from './section-industry-grid';
import SectionMediaGrid from './section-media-grid';
import SectionProjectGrid from './section-project-grid';
import SectionProjectsGrid from './section-projects-grid';
import SectionSchoolsGrid from './section-schools-grid';
import SectionLibraryFeatured from './section-library-featured';
import SectionColumn from './section-column';
import SectionLibraryHero from './section-library-hero';

const sectionComponents = {
  SectionCard,
  SectionGlobe,
  SectionHero,
  SectionText,
  SectionImageGrid,
  SectionIndustryGrid,
  SectionMediaGrid,
  SectionProjectGrid,
  SectionProjectsGrid,
  SectionSchoolsGrid,
  SectionLibraryFeatured,
  SectionColumn,
  SectionLibraryHero,
};

const ContentSections = ({ content, slug = null, isPageContent = false, color, textOnly = false }) =>
  content.map((section) => {
    const component = section.__typename.replace('Sanity', '');

    if (component === 'GlobalSection') {
      return (sectionComponents[section.content[0].__typename.replace('Sanity', '')] || SectionDebug)({
        section: section.content[0],
        isPageContent,
        slug,
      });
    }
    return (sectionComponents[component] || SectionDebug)({ section, isPageContent, slug, textOnly, color });
  });

export default ContentSections;
