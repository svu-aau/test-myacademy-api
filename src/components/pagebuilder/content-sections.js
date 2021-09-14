import React from 'react';
// import SectionCard from './section-card';
import SectionDebug from './section-debug';
// import SectionHero from './section-hero';
// import SectionText from './section-text';
// import SectionImageGrid from './section-image-grid';
// import SectionIndustryGrid from './section-industry-grid';
// import SectionMediaGrid from './section-media-grid';
// import SectionProjectGrid from './section-project-grid';
// import SectionProjectsGrid from './section-projects-grid';
// import SectionSchoolsGrid from './section-schools-grid';
// import SectionLibraryCard from './section-library-card';
// import SectionLibraryFeatured from './section-library-featured';
// import SectionColumn from './section-column';
// import SectionLibraryHero from './section-library-hero';
import loadable from '@loadable/component';

const sectionComponents = {
  SectionCard: 'section-card',
  SectionHero: 'section-hero',
  SectionText: 'section-text',
  SectionImageGrid: 'section-image-grid',
  SectionIndustryGrid: 'section-industry-grid',
  SectionMediaGrid: 'section-media-grid',
  SectionProjectGrid: 'section-project-grid',
  SectionProjectsGrid: 'section-projects-grid',
  SectionSchoolsGrid: 'section-schools-grid',
  SectionLibraryCard: 'section-library-card',
  SectionLibraryFeatured: 'section-library-featured',
  SectionColumn: 'section-column',
  SectionLibraryHero: 'section-library-hero',
};

const AsyncComponent = loadable((props) => import(`./${props.component}`), {
  cacheKey: (props) => props.component,
});

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
      return (
        <AsyncComponent
          component={sectionComponents[component]}
          section={section}
          isPageContent={isPageContent}
          slug={slug}
          noPaddingTop={noPaddingTop}
          noPadding={component === 'SectionColumn'}
          textOnly={textOnly}
          color={color}
        />
      );
      // return sectionComponents[component]({
      //   section,
      //   isPageContent,
      //   slug,
      //   noPaddingTop,
      //   noPadding: component === 'SectionColumn',
      //   textOnly,
      //   color,
      // });
    }
    return null;
  });

export default ContentSections;
