import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import DropdownMenu from '../components/DropdownMenu';
import * as uiActions from '../actions/ui';
import * as currentUserActions from '../actions/currentUser';
import config from '../configuration';

const mapStateToProps = state => ({
  dropdownMenuId: state.ui.dropdownMenuId,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  closeDropdownMenu: uiActions.closeDropdownMenu,
  unsetCurrentUser: currentUserActions.unset,
  push,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  handleMenuItemClick: id => () => {
    if (id === 'logout') {
      dispatchProps.unsetCurrentUser();
      dispatchProps.push(config.routes.login);
    }

    if (id === 'settings') {
      dispatchProps.push(config.routes.accountSettings);
    }
  },
  handleBackgroundClick: (event) => {
    event.stopPropagation();
    dispatchProps.closeDropdownMenu();
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DropdownMenu);
