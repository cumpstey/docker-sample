import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VerifyEmailPage from '../components/VerifyEmailPage';
import { FORM_ID } from '../configuration/forms/verifyEmail';
import * as actions from '../actions/forms/verifyEmail';

const mapStateToProps = state => ({
  generalError: state[FORM_ID].errors[''],
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleSubmit: actions.submit,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  handleSubmit: () => dispatchProps.handleSubmit(ownProps.match.params.userId, ownProps.match.params.token),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(VerifyEmailPage);
