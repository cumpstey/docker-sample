import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import Header from '../components/Header';
import * as currentUserActions from '../actions/currentUser/user';
import * as uiActions from '../actions/ui';
import { routes } from '../configuration';
import { modal } from '../constants';

const mapStateToProps = state => ({
  dropdownMenuId: state.ui.dropdownMenuId,
  isMobileNavVisible: state.ui.isMobileNavVisible,
  userIsLoaded: state.currentUser.userIsLoaded,
  user: state.currentUser.user,
  role: state.app.role,
  canChangeRole: state.currentUser.roles.length,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openDropdownMenu: uiActions.openDropdownMenu,
  openMobileNav: uiActions.openMobileNav,
  closeMobileNav: uiActions.closeMobileNav,
  unsetCurrentUser: currentUserActions.unset,
  openModal: uiActions.showModal,
  push,
}, dispatch);

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  handleMobileNavIconClick: () => {
    if (stateProps.isMobileNavVisible) dispatchProps.closeMobileNav();
    if (!stateProps.isMobileNavVisible) dispatchProps.openMobileNav();
  },
  handleMobileNavBackgroundClick: (event) => {
    event.stopPropagation();
    dispatchProps.closeMobileNav();
  },
  openAccountMenu: () => dispatchProps.openDropdownMenu('accountMenu'),
  shouldDisplayDropdown: stateProps.dropdownMenuId === 'accountMenu',
  handleLogout: () => {
    dispatchProps.unsetCurrentUser();
    dispatchProps.push(routes.login);
  },
  handleChangeRole: () => dispatchProps.openModal(modal.changeRole),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Header);
