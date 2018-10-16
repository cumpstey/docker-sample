import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Button from '../Button';
import Pagination from '../../containers/Pagination';
import Table from '../../containers/Table';
import './style.css';

const EnhancedTable = (props) => {
  const hasData = props.rows.length > 0;

  const button = (
    <Button
      text="Download Report"
      color="gray"
      icon="export"
      isDisabled={!hasData}
    />
  );

  const link = (
    <Link to={props.exportDataPath} download target="_blank">
      {button}
    </Link>
  );

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
            {props.exportDataPath && hasData && link}
            {props.exportDataPath && !hasData && button}
          </div>
        </div>
        <Table columns={props.columns} rows={props.rows} isLoading={props.isLoading} id={props.id} />
      </div>
      {!props.noPagination && <Pagination isLoading={props.isLoading} />}
    </div>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  primaryHeading: PropTypes.string,
  secondaryHeading: PropTypes.string,
  exportDataPath: PropTypes.string,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  noPagination: PropTypes.bool,
  buttons: PropTypes.arrayOf(PropTypes.element),
};

export default EnhancedTable;
