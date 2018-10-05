import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';
import Button from '../Button';
import Form from '../Form';
import Callout from '../Callout';
import Layout from '../LayoutAnonymous';
import TextField from '../../containers/TextField';
import AuthBox from '../AuthBox';
import config from '../../configuration';

const resetPasswordLink = <Link to={config.routes.forgotPassword}>Forgot Password?</Link>;

const LoginPage = props =>
  <Layout className="login-page">
    <AuthBox footer={resetPasswordLink}>
      {props.serverMessage &&
        <Callout text={props.serverMessage} type={props.serverMessageType} />
      }
      <Form handleSubmit={props.handleSignInClick}>
        <TextField id="email" formId="loginForm" />
        <TextField id="password" formId="loginForm" />
        <Button
          text="Sign in"
          color="blue"
          isDisabled={!props.canSubmit}
          handleClick={props.handleSignInClick}
          fullWidth
        />
      </Form>
    </AuthBox>
  </Layout>;

LoginPage.propTypes = {
  canSubmit: PropTypes.bool,
  handleSignInClick: PropTypes.func,
  serverMessage: PropTypes.string,
  serverMessageType: PropTypes.string,
};

export default LoginPage;
