import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '../components/TextField';
import * as actions from '../actions';

const mapStateToProps = (state, ownProps) => {
  const field = state[ownProps.formId].fields[ownProps.id];
  const errors = state[ownProps.formId].errors[field.serverId] || [];
  const hasErrors = Boolean(errors.length);

  return { field, errors, hasErrors };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  formUpdateField: actions.formUpdateField,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  handleChange: event =>
    dispatchProps.formUpdateField(ownProps.id, ownProps.formId, event.target.value),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TextField);
