import React from 'react';
import PropTypes from 'prop-types';
import Button from '../formElements/Button';
import Form from '../formElements/Form';
import FormMessage from '../formElements/FormMessage';
import TextField from '../../containers/TextField';
import { FORM_ID } from '../../configuration/forms/login';

const LoginForm = props =>
  <>
    {props.generalError &&
      <FormMessage text={props.generalError} type="error" />
    }
    <Form handleSubmit={props.handleSignInClick}>
      <TextField id="email" formId={FORM_ID} />
      <TextField id="password" formId={FORM_ID} />
      <Button
        text="Sign in"
        color="blue"
        isDisabled={!props.canSubmit}
        handleClick={props.handleSubmit}
        fullWidth
      />
    </Form>
  </>

LoginForm.propTypes = {
  canSubmit: PropTypes.bool,
  handleSubmit: PropTypes.func,
  generalError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default LoginForm;
