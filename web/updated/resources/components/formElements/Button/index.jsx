import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import Svg from '../Svg';
import './style.css';

const Button = ({ text, color = 'transparent', icon, isDisabled, fullWidth, handleClick }) => {
  const cssClasses = classnames('button', {
    'button--blue': color === 'blue',
    'button--green': color === 'green',
    'button--white': color === 'white',
    'button--gray': color === 'grey' || color === 'gray',
    'button--transparent': color === 'transparent',
    'button--disabled': isDisabled,
    'button--full-width': fullWidth,
  });

  const onClick = () => {
    if (!isDisabled && handleClick) {
      handleClick();
    }

    return false;
  };

  const tabIndex = (!handleClick || isDisabled) ? -1 : 0;
  const onKeyUp = event => event.preventDefault();
  const role = !handleClick ? 'presentation' : '';

  return (
    <button className={cssClasses} onClick={onClick} onKeyUp={onKeyUp} tabIndex={tabIndex} role={role}>
      <div className="button-inner">
        {icon &&
          <div className="button-icon">
            {/* <Svg name={icon} /> */}
          </div>
        }
        <div className="button-text">
          {text}
        </div>
      </div>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  isDisabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default Button;
