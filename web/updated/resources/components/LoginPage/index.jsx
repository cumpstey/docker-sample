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
import { FORM_ID } from '../../configuration/forms/login';

const resetPasswordLink = <div>
  <Link to={routes.forgotPassword}>Forgot password</Link>?
  <br />
  Or <Link to={routes.register}>register here</Link>.
</div>;

const LoginPage = props =>
  <Layout className="login-page">
    <AuthBox title="Log in" footer={resetPasswordLink}>
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
    </AuthBox>
  </Layout>;

LoginPage.propTypes = {
  canSubmit: PropTypes.bool,
  handleSubmit: PropTypes.func,
  generalError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default LoginPage;
