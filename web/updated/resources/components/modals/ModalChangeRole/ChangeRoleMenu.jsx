import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../../actions/app';
import * as uiActions from '../../../actions/ui';
import './style.css';
import Menu from '../../Menu';
import { icon, modal } from '../../../constants';

const mapStateToProps = state => ({
  currentRole: state.app.role,
  roles: state.currentUser.roles,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setRole: appActions.setRole,
  closeModal: uiActions.closeModal,
}, dispatch);


const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...ownProps,
  setRole: role => {
    dispatchProps.setRole(role);
    dispatchProps.closeModal(modal.changeRole);
  },
});

const ChangeRoleMenu = props => {
  const menu = props.roles.map(role => ({
    id: role,
    icon: icon.person,
    name: role,
    handleClick: () => props.setRole(role),
  }));

  return <Menu data={menu} selectedMenuItemId={props.currentRole} />
}

ChangeRoleMenu.propTypes = {
  changeRole: PropTypes.func,
  currentRole: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ChangeRoleMenu);
