import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Svg from '../../Svg';
import { toParamCase, findColumnItem } from '../../../helpers/table';
import { icon } from '../../../constants';

const TableHeaderCell = ({ data, orderBy, sortBy, handleClick }) => {
  const { id, isSortable, text } = data;
  const cssClasses = classnames('table-cell', `table-cell--${toParamCase(id)}`, {
    'table-cell--sorted': findColumnItem(sortBy) === id,
    'table-cell--sortable': isSortable,
  });

  const iconName = !sortBy
    ? icon.unsorted
    : orderBy === 'asc' ? icon.sortUp : icon.sortDown;
  const onClick = isSortable ? handleClick : false;
  const setColorIcon = id === 'communications' ? `table-cell-icon table-cell-list-item--${sortBy}` : 'table-cell-icon';

  return (
    <div className={cssClasses} onClick={onClick}>
      <div className="table-cell-value">{text}</div>
      {isSortable &&
        <div className={setColorIcon}>
          <Svg name={iconName} />
        </div>
      }
    </div>
  );
};

TableHeaderCell.propTypes = {
  data: PropTypes.object,
  sortBy: PropTypes.string,
  orderBy: PropTypes.string,
  handleClick: PropTypes.func,
};

export default TableHeaderCell;
