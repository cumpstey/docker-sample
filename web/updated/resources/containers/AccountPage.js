import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AccountPage from '../components/AccountPage';
import * as userActions from '../actions/currentUser/user';
import * as twoFactorAuthActions from '../actions/currentUser/twoFactorAuth';
import * as disableTwoFactorAuthActions from '../actions/forms/disableTwoFactorAuth';
import * as uiActions from '../actions/ui';
import { modal } from '../constants';

const mapStateToProps = (state, ownProps) => {
  return {
    userIsLoaded: state.currentUser.userIsLoaded,
    twoFactorAuthIsLoaded: state.currentUser.twoFactorAuthIsLoaded,
    firstName: state.currentUser.user.firstName,
    lastName: state.currentUser.user.lastName,
    email: state.currentUser.user.email,
    twoFactorAuthEnabled: state.currentUser.twoFactorAuth.enabled,
    twoFactorAuthRecoveryCodesRemaining: state.currentUser.twoFactorAuth.recoveryCodesRemaining,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUser: userActions.fetch,
  fetchTwoFactorAuth: twoFactorAuthActions.fetch,
  disableTwoFactorAuth: disableTwoFactorAuthActions.submit,
  showModal: uiActions.showModal
}, dispatch);

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  showEnableTwoFactorAuthForm: () => dispatchProps.showModal(modal.enableTwoFactorAuth),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AccountPage);
