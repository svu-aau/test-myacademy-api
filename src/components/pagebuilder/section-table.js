import React from 'react';

import Container from '../layout/container';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import { responsiveTitle2 } from '../../styles/typography.module.css';
import { tableWrapper, tableHeadline } from './section-table.module.css';

import { cn } from '../../lib/helpers.js';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.action.hover,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
  root: {
    '&:nth-of-type(even)': {
      borderLeft: '1px solid #e0e0e0',
    },
  },
}))(TableCell);

// see data/fragments/Table
const SectionTable = ({ section }) => {
  const { title, table, hasHeader } = section;

  const classes = useStyles();

  let tableBody = [];
  let tableHeader = null;

  // if hasHeader is true, then the first row is the header row
  if (hasHeader) {
    tableHeader = table.rows[0];
    tableBody = table.rows.slice(1);
  } else {
    tableBody = table.rows;
  }

  return (
    <div id={section._key} className={tableWrapper}>
      <Container>
        {title ? <h2 className={cn(responsiveTitle2, tableHeadline)}>{title}</h2> : ''}
        {tableBody.length && (
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              {tableHeader && (
                <TableHead>
                  <TableRow>
                    {tableHeader.cells.map((cell, idx) => (
                      <StyledTableCell align="center" key={idx}>
                        {cell}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                {tableBody.map((row, idx) => {
                  return (
                    <StyledTableRow key={idx}>
                      {row.cells.map((value, idx) => {
                        return (
                          <StyledTableCell align="center" key={idx}>
                            {value}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  );
};

export default SectionTable;
