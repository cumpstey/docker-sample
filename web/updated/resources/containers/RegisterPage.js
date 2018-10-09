import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegisterPage from '../components/RegisterPage';
import { FORM_ID } from '../configuration/forms/register';
import * as actions from '../actions/forms/register';
import * as selectors from '../selectors';

const mapStateToProps = state => ({
  canSubmit: selectors.canSubmitRegisterForm(state),
  generalError: state[FORM_ID].errors[''],
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleSubmit: actions.submit,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
