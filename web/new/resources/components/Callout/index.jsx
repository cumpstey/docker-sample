import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.css';

const Callout = (props) => {
  const cssClasses = classnames('callout', {
    'callout--error': props.type === 'error',
  });

  return (
    <div className={cssClasses}>
      <p>{props.text}</p>
    </div>
  );
};

Callout.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};

export default Callout;
