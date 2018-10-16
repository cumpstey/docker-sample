import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';
import TableHeaderCell from './TableHeaderCell';
import Svg from '../../Svg';
import './style.css';

const Table = (props) => {
  const {
    rows,
    columns,
    sortBy,
    orderBy,
    handleHeaderClick,
  } = props;

  const tableRows = rows.map((row, index) => {
    return (
      <TableRow
        key={index}
        data={row}
        columns={columns}
      />
    );
  });

  const tableHeaderCells = columns.map(column => (
    <TableHeaderCell
      key={column.id}
      data={column}
      orderBy={orderBy}
      sortBy={sortBy}
      // handleClick={handleHeaderClick(column.serverId)}
    />
  ));

  return (
    <div className="table">
      <div className="table-header">
        {tableHeaderCells}
      </div>
      <div className="table-body">
        {tableRows}
      </div>
    </div>
  );
};

Table.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  sortBy: PropTypes.string,
  orderBy: PropTypes.string,
  handleHeaderClick: PropTypes.func,
};

export default Table;
