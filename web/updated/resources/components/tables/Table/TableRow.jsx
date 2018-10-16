import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableCell from './TableCell';
import Svg from '../Svg';

const TableRow = ({ data, columns, isSelected, isSelectable, isLoading, handleClick }) => {
  const cssClasses = classnames('table-row', {
    'table-row--selected': isSelected,
    'table-row--selectable': isSelectable,
  });

  const cells = columns.map((column, index) => {
    const value = data[column.id];

    return <TableCell key={index} id={column.id} value={value} isLoading={isLoading} />;
  });

  const svgName = isSelected ? 'radio-selected' : 'radio';
  const onClick = !handleClick ? false : handleClick;

  return (
    <div className={cssClasses} onClick={onClick}>
      {isSelectable &&
        <div className="table-cell table-cell--selection">
          <Svg name={svgName} />
        </div>
      }
      {cells}
    </div>
  );
};

TableRow.propTypes = {
  isLoading: PropTypes.bool,
  isSelectable: PropTypes.bool,
  isSelected: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.object,
  handleClick: PropTypes.func,
};

export default TableRow;
