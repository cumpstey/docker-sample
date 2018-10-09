import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginPage from '../components/LoginPage';
import { FORM_ID } from '../configuration/forms/login';
import * as actions from '../actions/forms/login';
import * as selectors from '../selectors';

const mapStateToProps = state => ({
  canSubmit: selectors.canSubmitLoginForm(state),
  generalError: state[FORM_ID].errors[''],
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleSubmit: actions.submit,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
