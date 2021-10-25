import SectionCard from './section-card';
import SectionDebug from './section-debug';
import SectionHero from './section-hero';
import SectionText from './section-text';
import SectionImageGrid from './section-image-grid';
import SectionIndustryGrid from './section-industry-grid';
import SectionMediaGrid from './section-media-grid';
import SectionProjectGrid from './section-project-grid';
import SectionProjectsGrid from './section-projects-grid';
import SectionSchoolsGrid from './section-schools-grid';
import SectionLibraryCard from './section-library-card';
import SectionLibraryFeatured from './section-library-featured';
import SectionColumn from './section-column';
import SectionLibraryHero from './section-library-hero';
import SectionLibraryProfile from './section-library-profile';

const sectionComponents = {
  SectionCard,
  SectionHero,
  SectionText,
  SectionImageGrid,
  SectionIndustryGrid,
  SectionMediaGrid,
  SectionProjectGrid,
  SectionProjectsGrid,
  SectionSchoolsGrid,
  SectionLibraryCard,
  SectionLibraryFeatured,
  SectionColumn,
  SectionLibraryHero,
  SectionLibraryProfile,
};

const ContentSections = ({
  content,
  slug = null,
  isPageContent = false,
  noPaddingTop = false,
  color,
  textOnly = false,
}) =>
  content.map((section) => {
    // console.log('section: ', section);
    if (section && section.__typename) {
      const component = section.__typename.replace('Sanity', '');

      if (component === 'GlobalSection') {
        return (sectionComponents[section.content[0]?.__typename.replace('Sanity', '')] || SectionDebug)({
          section: section.content[0],
          isPageContent,
          slug,
        });
      }

      // console.log('component', component);

      return (sectionComponents[component] || SectionDebug)({
        section,
        isPageContent,
        slug,
        noPaddingTop,
        noPadding: component === 'SectionColumn',
        textOnly,
        color,
      });
    }
    return null;
  });

export default ContentSections;
