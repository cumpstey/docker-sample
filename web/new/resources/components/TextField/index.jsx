import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CrossIcon from '../../assets/svg/cross.svg';
import './style.css';

const TextField = ({ id, field, handleChange, hasErrors, errors, ...props }) => {
  const { type, value, placeholder, isDisabled } = field;
  const label = props.label || field.label;
  const errorList = errors.map((error, index) => <li key={index}>{error}</li>);
  const cssClasses = classnames('text-field', `text-field--${id}`, {
    'text-field--error': hasErrors,
  });

  const getContent = () => {
    switch (type) {

      case 'textarea': {
        return (
          <textarea
            className="text-field-textarea"
            id={id}
            placeholder={placeholder}
            onInput={handleChange}
            value={value}
            disabled={isDisabled}
          />
        );
      }

      case 'text':
      case 'password':
      case 'tel':
      case 'email': {
        return (
          <input
            className="text-field-input"
            id={id}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            disabled={isDisabled}
            type={type}
          />
        );
      }

      default:
        return false;
    }
  };

  const content = getContent();

  return (
    <div className={cssClasses}>
      {label && <label className="text-field-label" htmlFor={id}>{label}</label>}
      <div className="text-field-inner">
        {hasErrors && <CrossIcon />}
        {content}
      </div>
      {hasErrors &&
        <ul className="text-field-error-list">
          {errorList}
        </ul>
      }
    </div>
  );
};

TextField.propTypes = {
  id: PropTypes.string,
  formId: PropTypes.string,
  field: PropTypes.object,
  errors: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  handleChange: PropTypes.func,
  hasErrors: PropTypes.bool,
};

export default TextField;
