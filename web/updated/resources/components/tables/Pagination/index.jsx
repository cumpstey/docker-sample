import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Svg from '../Svg';
import './style.css';

const Pagination = (props) => {
  const prevButtonCssClasses = classnames('pagination-button', {
    'pagination-button--disabled': props.isFirstPage,
  });

  const nextButtonCssClasses = classnames('pagination-button', {
    'pagination-button--disabled': props.isLastPage,
  });

  return (
    <div className="pagination">
      <div className={prevButtonCssClasses} onClick={props.handleButtonClick(-1)}>
        <Svg name="arrow-left" />
      </div>
      <div className="pagination-text">
        {props.text}
      </div>
      <div className={nextButtonCssClasses} onClick={props.handleButtonClick(+1)}>
        <Svg name="arrow-right" />
      </div>
    </div>
  );
};

Pagination.propTypes = {
  text: PropTypes.string,
  handleButtonClick: PropTypes.func,
  isFirstPage: PropTypes.bool,
  isLastPage: PropTypes.bool,
};

export default Pagination;
