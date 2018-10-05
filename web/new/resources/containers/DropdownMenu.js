import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import DropdownMenu from '../components/DropdownMenu';
import * as actions from '../actions';
import config from '../configuration';

const mapStateToProps = state => ({
  dropdownMenuId: state.app.dropdownMenuId,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  closeDropdownMenu: actions.closeDropdownMenu,
  unsetCurrentUser: actions.unsetCurrentUser,
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
