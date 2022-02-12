import React from 'react';

import { Table, Tabs } from '@aauweb/design-library';

import Container from '../layout/container';
import BlockContent from '../block-content';

import { responsiveTitle2 } from '../../styles/typography.module.css';
import { sectionTabs, sectionTabTitle, sectionTabsDecription } from './section-library-tabs.module.css';

import { cn } from '../../lib/helpers.js';

// see data/fragments/Tabs
const SectionLibraryTabs = ({ section }) => {
  const { title, description, tabs } = section;

  const data = tabs.map(({ tabContent, title, tabBottomContent, tabTable, hasTableHeader }) => {
    const tabRichContent = tabContent ? <BlockContent blocks={tabContent} /> : null;
    const tabBottomRichContent = tabBottomContent ? <BlockContent blocks={tabBottomContent} /> : null;
    let tableComponent = null;
    if (tabTable?.rows) {
      let tableRows = [];
      let tableHeaders = [];

      // if hasHeader is true, then the first row is the header row
      if (hasTableHeader) {
        tableHeaders = tabTable.rows[0].cells;
        tableRows = tabTable.rows.slice(1).map(({ cells }) => cells);
      } else {
        tableRows = tabTable.rows.map(({ cells }) => cells);
      }
      tableComponent = <div>{tableRows.length && <Table headers={tableHeaders} rows={tableRows} />}</div>;
    }
    return [title, tabRichContent, tableComponent, tabBottomRichContent];
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

export default SectionLibraryTabs;
