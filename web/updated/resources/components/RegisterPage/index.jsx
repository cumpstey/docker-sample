import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';
import Button from '../formElements/Button';
import Form from '../formElements/Form';
import FormMessage from '../formElements/FormMessage';
import Layout from '../LayoutAnonymous';
import TextField from '../../containers/TextField';
import AuthBox from '../AuthBox';
import { routes } from '../../configuration';
import { FORM_ID } from '../../configuration/forms/register';

const resetPasswordLink = <div>
  Already signed up? <Link to={routes.login}>Log in here</Link>.
</div>;

const RegisterPage = props =>
  <Layout className="login-page">
    <AuthBox title="Log in" footer={resetPasswordLink}>
      {props.generalError &&
        <FormMessage text={props.generalError} type="error" />
      }
      <Form handleSubmit={props.handleSignInClick}>
        <TextField id="firstName" formId={FORM_ID} />
        <TextField id="lastName" formId={FORM_ID} />
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
    </AuthBox>
  </Layout>;

RegisterPage.propTypes = {
  canSubmit: PropTypes.bool,
  handleSubmit: PropTypes.func,
  generalError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default RegisterPage;
