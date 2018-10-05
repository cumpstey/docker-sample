import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Svg from '../Svg';
import './style.css';

const SquareIcon = ({ name, color = 'blue', isDisabled = false }) => {
  const cssClasses = classnames('square-icon', {
    'square-icon--green': color === 'green',
    'square-icon--blue': color === 'blue',
    'square-icon--disabled': isDisabled,
  });

  return (
    <div className={cssClasses}>
      <Svg name={name} />
    </div>
  );
};

SquareIcon.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default SquareIcon;
