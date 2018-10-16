import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';
import Layout from '../LayoutAnonymous';
import AuthBox from '../AuthBox';
import LoginForm from '../../containers/LoginForm';
import LoginTwoFactorForm from '../../containers/LoginTwoFactorForm';
import { routes } from '../../configuration';

const resetPasswordLink = <div>
  <Link to={routes.forgotPassword}>Forgot password</Link>?
  <br />
  Or <Link to={routes.register}>register here</Link>.
</div>;

const LoginPage = props =>
  <Layout className="login-page">
    <AuthBox title="Log in" footer={resetPasswordLink}>
      {props.requireTwoFactorAuth
        ? <LoginTwoFactorForm />
        : <LoginForm />}
    </AuthBox>
  </Layout>;

LoginPage.propTypes = {
  step: PropTypes.number,
};

export default LoginPage;
