import React from 'react';

import Container from '../layout/container';

import { Table } from '@aauweb/design-library';

import { responsiveTitle2 } from '../../styles/typography.module.css';
import { tableWrapper, tableHeadline } from './section-table.module.css';

import { cn } from '../../lib/helpers.js';

// see data/fragments/Table
const SectionTable = ({ section }) => {
  const { title, table, hasHeader } = section;

  let tableRows = [];
  let tableHeaders = [];

  // if hasHeader is true, then the first row is the header row
  if (hasHeader) {
    tableHeaders = table.rows[0].cells;
    tableRows = table.rows.slice(1).map(({ cells }) => cells);
  } else {
    tableRows = table.rows.map(({ cells }) => cells);
  }

  return (
    <div id={section._key} className={tableWrapper}>
      <Container>
        {title ? <h2 className={cn(responsiveTitle2, tableHeadline)}>{title}</h2> : ''}
        {tableRows.length && <Table headers={tableHeaders} rows={tableRows} />}
      </Container>
    </div>
  );
};

export default SectionTable;
