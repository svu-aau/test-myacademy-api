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
};

const ContentSections = ({ content }) =>
  content.map((section) => {
    const component = section.__typename.replace('Sanity', '');
    if (component === 'GlobalSection') {
      return (sectionComponents[section.content[0].__typename.replace('Sanity', '')] || SectionDebug)({
        section: section.content[0],
      });
    }
    return (sectionComponents[component] || SectionDebug)({ section });
  });

export default ContentSections;
