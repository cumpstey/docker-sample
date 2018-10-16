import { combineReducers } from 'redux';

import app from './app';
import currentUser from './currentUser';
import enableTwoFactorAuthForm from './forms/enableTwoFactorAuth';
import loginForm from './forms/login';
import loginTwoFactorForm from './forms/loginTwoFactor';
import registerForm from './forms/register';
import ui from './ui';
import users from './users';
import verifyEmailForm from './forms/verifyEmail';

export default combineReducers({
  app,
  currentUser,
  enableTwoFactorAuthForm,
  loginForm,
  loginTwoFactorForm,
  registerForm,
  ui,
  users,
  verifyEmailForm,
});
