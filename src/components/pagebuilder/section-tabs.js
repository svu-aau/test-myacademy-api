import React from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Container from '../layout/container';
import BlockContent from '../block-content';

import { responsiveTitle2 } from '../../styles/typography.module.css';
import { sectionTabs, sectionTabTitle, sectionTabsDecription, sectionTabContent } from './section-tabs.module.css';

import { cn } from '../../lib/helpers.js';

// see data/fragments/Tabs
const SectionTabs = ({ section }) => {
  const { title, description, tabs } = section;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={sectionTabs} id={section._key}>
      <Container>
        {title ? <h2 className={cn(responsiveTitle2, sectionTabTitle)}>{title}</h2> : ''}
        <div className={sectionTabsDecription}>
          <BlockContent blocks={description} />
        </div>
        {tabs.length && (
          <div>
            <Tabs value={value} onChange={handleChange} aria-label={title}>
              {tabs.map(({ title }) => (
                <Tab label={title} key={title} />
              ))}
            </Tabs>
            {tabs.map(({ tabContent }, idx) => (
              <TabPanel value={value} index={idx} key={idx}>
                <BlockContent blocks={tabContent} />
              </TabPanel>
            ))}
          </div>
        )}
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
