import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.css';

const Callout = (props) => {
  const cssClasses = classnames('callout', {
    'callout--error': props.type === 'error',
    'callout--success': props.type === 'success',
  });

  const text = (Array.isArray(props.text) ? props.text : [props.text]).map((i, j) => <p key={j}>{i}</p>);

  return (!!text.length &&
    <div className="callout-container">
      <div className={cssClasses}>
        {text}
      </div>
    </div>
  );
};

Callout.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  type: PropTypes.string,
};

export default Callout;
