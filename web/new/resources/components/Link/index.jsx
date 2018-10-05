import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReactLink } from 'react-router';
import { checkExternalUrl } from '../../helpers/url';

const Link = ({ children, to, className, isDownload }) => {
  const isExternal = checkExternalUrl(to);
  const reactLink = <ReactLink to={to} className={className}>{children}</ReactLink>;
  const link = (
    <a className={className} href={to} target={isExternal && !isDownload ? "_blank" : null} rel="noopener noreferrer" download={isDownload}>
      {children}
    </a>
  );

  return isExternal ? link : reactLink;
};

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  className: PropTypes.string,
  to: PropTypes.string,
  isDownload: PropTypes.bool,
};

export default Link;
