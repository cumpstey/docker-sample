import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { toParamCase } from '../../helpers';
import LoadingPlaceholder from '../LoadingPlaceholder';

const TableCell = ({ value, isLoading, ...props }) => {
  const id = toParamCase(props.id);
  const cssClasses = classnames('table-cell', `table-cell--${id}`, {
    'table-cell--loading': isLoading,
  });

  return (
    <div className={cssClasses}>
      <div className="table-cell-value">
        {isLoading && <LoadingPlaceholder />}
        {!isLoading && value}
      </div>
    </div>
  );
};

TableCell.propTypes = {
  isLoading: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]),
  id: PropTypes.string,
};

export default TableCell;
