import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header';
import * as actions from '../actions';

const mapStateToProps = state => ({
  dropdownMenuId: state.app.dropdownMenuId,
  isMobileNavVisible: state.app.isMobileNavVisible,
  userIsLoaded: state.currentUser.isLoaded,
  user: state.currentUser.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openDropdownMenu: actions.openDropdownMenu,
  openMobileNav: actions.openMobileNav,
  closeMobileNav: actions.closeMobileNav,
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
