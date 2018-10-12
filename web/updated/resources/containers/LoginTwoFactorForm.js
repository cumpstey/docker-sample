import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginTwoFactorForm from '../components/LoginPage/LoginTwoFactorForm';
import { FORM_ID } from '../configuration/forms/loginTwoFactor';
import * as actions from '../actions/forms/loginTwoFactor';
import * as selectors from '../selectors';

const mapStateToProps = state => ({
  canSubmit: selectors.canSubmitLoginForm(state),
  generalError: state[FORM_ID].errors[''],
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleSubmit: actions.submit,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginTwoFactorForm);
