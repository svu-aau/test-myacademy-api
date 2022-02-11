import React from 'react';

import { Tabs } from '@aauweb/design-library';

import Container from '../layout/container';
import BlockContent from '../block-content';

import { responsiveTitle2 } from '../../styles/typography.module.css';
import { sectionTabs, sectionTabTitle, sectionTabsDecription, sectionTabContent } from './section-tabs.module.css';

import { cn } from '../../lib/helpers.js';
import { carouselDescription } from './section-library-image-carousel.module.css';

// see data/fragments/Tabs
const SectionTabs = ({ section }) => {
  const { title, description, tabs } = section;

  const data = tabs.map(({ tabContent, title }) => {
    const tabRichContent = tabContent ? <BlockContent blocks={tabContent} /> : null;
    return [title, tabRichContent];
  });

  return (
    <div className={sectionTabs} id={section._key}>
      <Container>
        {title ? <h2 className={cn(responsiveTitle2, sectionTabTitle)}>{title}</h2> : ''}
        {description && (
          <div className={sectionTabsDecription}>
            <BlockContent blocks={description} />
          </div>
        )}
        {tabs.length && <Tabs data={data} />}
      </Container>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className={sectionTabContent}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <div>{children}</div>
    </div>
  );
}

export default SectionTabs;
