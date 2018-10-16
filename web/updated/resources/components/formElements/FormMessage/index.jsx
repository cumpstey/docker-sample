import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.css';

const FormMessage = (props) => {
  const cssClasses = classnames('form-message', {
    'form-message--error': props.type === 'error',
  });

  const text = (Array.isArray(props.text) ? props.text : [props.text]).map((i, j) => <p key={j}>{i}</p>);

  return (
    <div className={cssClasses}>
      {text}
    </div>
  );
};

FormMessage.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  type: PropTypes.string,
};

export default FormMessage;
