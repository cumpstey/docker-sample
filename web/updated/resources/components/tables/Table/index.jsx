import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';
import TableHeaderCell from './TableHeaderCell';
import Svg from '../Svg';
import './style.css';

const Table = (props) => {
  const {
    rows,
    columns,
    sortBy,
    orderBy,
    selectedRowIndex,
    isSelectable,
    handleRowClick,
    handleHeaderClick,
    isLoading,
  } = props;

  const tableRows = rows.map((row, index) => {
    const isSelected = selectedRowIndex === index;
    const handleClick = () => (isSelectable ? handleRowClick(index) : false);

    return (
      <TableRow
        key={index}
        handleClick={handleClick}
        data={row}
        columns={columns}
        isSelected={isSelected}
        isSelectable={isSelectable}
        isLoading={isLoading}
      />
    );
  });

  const tableHeaderCells = columns.map(column => (
    <TableHeaderCell
      key={column.id}
      data={column}
      orderBy={orderBy}
      sortBy={sortBy}
      handleClick={handleHeaderClick(column.serverId)}
    />
  ));

  return (
    <div className="table">
      <div className="table-header">
        {isSelectable &&
          <div className="table-cell table-cell--selection">
            <Svg name="radio" />
          </div>
        }
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
  selectedRowIndex: PropTypes.number,
  isSelectable: PropTypes.bool,
  handleRowClick: PropTypes.func,
  handleHeaderClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default Table;
