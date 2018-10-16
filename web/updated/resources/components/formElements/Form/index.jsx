import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Form = (props) => {
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return <form onSubmit={onSubmit} className="form">{props.children}</form>;
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default Form;
