import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.css';

export const action = {
  blank: 'blank',
  error: 'error',
};

const mapStateToProps = state => ({
  currentRole: state.app.role,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

class RestrictByRole extends Component {
  render() {
    const restrictTo = Array.isArray(this.props.restrictTo) ? this.props.restrictTo : [this.props.restrictTo];
    const restrictedContent = this.props.action == action.error
      ? <div className="restricted restricted--error"><p>Not authorised to view this content</p></div>
      : <></>

    return restrictTo.indexOf(this.props.currentRole) > -1 ? this.props.children : restrictedContent;
  }
}

RestrictByRole.propTyes = {
  restrictTo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  currentRole: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestrictByRole);
