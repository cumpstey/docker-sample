import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header';
import * as uiActions from '../actions/ui';

const mapStateToProps = state => ({
  dropdownMenuId: state.ui.dropdownMenuId,
  isMobileNavVisible: state.ui.isMobileNavVisible,
  userIsLoaded: state.currentUser.isLoaded,
  user: state.currentUser.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openDropdownMenu: uiActions.openDropdownMenu,
  openMobileNav: uiActions.openMobileNav,
  closeMobileNav: uiActions.closeMobileNav,
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
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Header);
