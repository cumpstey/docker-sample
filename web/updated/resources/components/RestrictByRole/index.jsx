import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
  currentRole: state.app.role,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

const RestrictByRole = props => {
  const restrictTo = Array.isArray(props.restrictTo) ? props.restrictTo : [props.restrictTo];
  return restrictTo.indexOf(props.currentRole) > -1 ? props.children : <div>Not authorised</div>;
};

RestrictByRole.propTyes = {
  restrictTo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  currentRole: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestrictByRole);
