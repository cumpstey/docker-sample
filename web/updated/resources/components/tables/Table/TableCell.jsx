import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { toParamCase } from '../../../helpers/table';

const TableCell = ({ value, isLoading, ...props }) => {
  const id = toParamCase(props.id);
  const cssClasses = classnames('table-cell', `table-cell--${id}`);

  return (
    <div className={cssClasses}>
      <div className="table-cell-value">
        {value}
      </div>
    </div>
  );
};

TableCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]),
  id: PropTypes.string,
};

export default TableCell;
