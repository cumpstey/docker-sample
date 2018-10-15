import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as impersonateRoleActions from '../../../actions/impersonateRole';
import * as uiActions from '../../../actions/ui';
import './style.css';
import Menu from '../../Menu';
import { icon, modal } from '../../../constants';

const DEFAULT_ROLE = 'Default';

const DEFAULT_ROLE_LABEL = 'Default user';

const mapStateToProps = state => ({
  currentRole: state.app.role,
  roles: state.currentUser.roles,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setRole: impersonateRoleActions.fetch,
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
  const menu = Array.concat(props.roles.map(role => ({
    id: role,
    icon: icon.person,
    name: role,
    handleClick: () => props.setRole(role),
  })), {
    id: DEFAULT_ROLE,
    icon: icon.person,
    name: DEFAULT_ROLE_LABEL,
    handleClick: () => props.setRole(null),
  });

  return <Menu data={menu} selectedMenuItemId={props.currentRole || DEFAULT_ROLE} />
}

ChangeRoleMenu.propTypes = {
  changeRole: PropTypes.func,
  currentRole: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ChangeRoleMenu);
