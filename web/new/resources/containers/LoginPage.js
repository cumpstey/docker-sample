import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginPage from '../components/LoginPage';
import * as actions from '../actions';
import * as selectors from '../selectors';

const mapStateToProps = state => ({
  canSubmit: selectors.canSubmitLoginForm(state),
  serverMessage: state.loginForm.serverMessage,
  serverMessageType: state.loginForm.serverMessageType,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleSignInClick: actions.submitLoginForm,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
