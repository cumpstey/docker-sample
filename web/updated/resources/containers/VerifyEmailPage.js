import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VerifyEmailPage from '../components/VerifyEmailPage';
// import * as EmailFormActions from '../actions/forms/verifyEmail';
// import * as selectors from '../selectors';

const mapStateToProps = state => ({
  // canSubmit: selectors.canSubmitLoginForm(state),
  // generalError: state.loginForm.errors[''],
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // handleSignInClick: loginFormActions.submit,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailPage);
