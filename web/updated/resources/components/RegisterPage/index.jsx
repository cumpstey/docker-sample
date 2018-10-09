import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';
import Button from '../Button';
import Form from '../Form';
import FormMessage from '../FormMessage';
import Layout from '../LayoutAnonymous';
import TextField from '../../containers/TextField';
import AuthBox from '../AuthBox';
import { routes } from '../../configuration';
import { FORM_ID } from '../../configuration/forms/register';

const loginLink = <div>Already have an account? <Link to={routes.login}>Log in</Link>.</div>;

const RegisterPage = props =>
  <Layout className="register-page">
    <AuthBox title="Register" footer={loginLink}>
      {props.generalError &&
        <FormMessage text={props.generalError} type="error" />
      }
      <Form handleSubmit={props.handleSignInClick}>
        <TextField id="firstName" formId={FORM_ID} />
        <TextField id="lastName" formId={FORM_ID} />
        <TextField id="email" formId={FORM_ID} />
        <TextField id="password" formId={FORM_ID} />
        <Button
          text="Register"
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
