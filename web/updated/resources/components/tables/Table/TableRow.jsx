import React from 'react';
import PropTypes from 'prop-types';
import TableCell from './TableCell';

const TableRow = ({ data, columns }) => {

  const cells = columns.map((column, index) => {
    const value = data[column.id];

    return <TableCell key={index} id={column.id} value={value} />;
  });

  return (
    <div className="table-row">
      {cells}
    </div>
  );
};

TableRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.object,
};

export default TableRow;
