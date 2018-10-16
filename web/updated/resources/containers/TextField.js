import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '../components/formElements/TextField';
import config from '../configuration';
import * as formActions from '../actions/forms';

const mapStateToProps = (state, ownProps) => {
  const fieldDefinition = config.forms[ownProps.formId].fields[ownProps.id];
  const fieldState = state[ownProps.formId].fields[ownProps.id];
  const errors = state[ownProps.formId].errors[fieldDefinition.serverId] || [];
  const hasErrors = Boolean(errors.length);

  return { fieldDefinition, fieldState, errors, hasErrors };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  formUpdateField: formActions.updateField,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  handleChange: event =>
    dispatchProps.formUpdateField(ownProps.formId, ownProps.id, event.target.value),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TextField);
