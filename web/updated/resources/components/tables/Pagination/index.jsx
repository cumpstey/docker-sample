import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Svg from '../../Svg';
import './style.css';
import { icon } from '../../../constants';

const Pagination = props => {
  const isFirstPage = props.page === 1;
  const isLastPage = props.page === props.totalPages;

  const prevButtonCssClasses = classnames('pagination-button', {
    'pagination-button--disabled': isFirstPage,
  });

  const nextButtonCssClasses = classnames('pagination-button', {
    'pagination-button--disabled': isLastPage,
  });

  return (
    <div className="pagination">
      {/* <div className={prevButtonCssClasses} onClick={props.handleButtonClick(-1)}> */}
      <div className={prevButtonCssClasses} onClick={() => props.handlePageChange(props.page - 1)}>
        <Svg name={icon.arrowLeft} />
      </div>
      <div className="pagination-text">
        {`Page ${props.page} of ${props.totalPages}`}
      </div>
      {/* <div className={nextButtonCssClasses} onClick={props.handleButtonClick(+1)}> */}
      <div className={nextButtonCssClasses} onClick={() => props.handlePageChange(props.page + 1)}>
        <Svg name={icon.arrowRight} />
      </div>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  handlePageChange: PropTypes.func,
};

export default Pagination;
