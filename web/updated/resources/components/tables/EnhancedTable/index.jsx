import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Button from '../../formElements/Button';
import Pagination from '../Pagination';
import Table from '../Table';
import './style.css';

const EnhancedTable = (props) => {

  const showPagination = props.meta.totalPages > 1 && !props.isLoading;

  return (
    <div className="enhanced-table">
      <div className="enhanced-table-section">
        <div className="enhanced-table-header">
          <div className="enhanced-table-header-text">
            <h1>{props.primaryHeading}</h1>
            <h3>{props.secondaryHeading}</h3>
          </div>
          <div className="enhanced-table-header-buttons">
            {props.buttons}
          </div>
        </div>
        <Table columns={props.columns} rows={props.rows} id={props.id} />
      </div>
      {showPagination &&
        <Pagination
          totalPages={props.meta.totalPages}
          page={props.meta.page}
          handlePageChange={page => props.updateQuery({page})}
        />
      }
    </div>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  primaryHeading: PropTypes.string,
  secondaryHeading: PropTypes.string,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  buttons: PropTypes.arrayOf(PropTypes.element),
  meta: PropTypes.object,
  updateQuery: PropTypes.func,
};

export default EnhancedTable;
