import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.css';

const Callout = (props) => {
  const getClassName = (type) => classnames('callout', {
    'callout--error': type === 'error',
    'callout--success': type === 'success',
  });

  const items = (props.messages || []).map((i, j) => {
    const className = getClassName(i.type);
    return <div key={j} className={className}><p>{i.text}</p></div>
  });

  return (!!items.length &&
    <div className="callout-container">
      {items}
    </div>
  );
};

Callout.propTypes = {
  messages: PropTypes.array,
};

export default Callout;
