import { combineReducers } from 'redux';

import app from './app';
import currentUser from './currentUser';
import ui from './ui';

import enableTwoFactorAuthForm from './forms/enableTwoFactorAuth';
import loginForm from './forms/login';
import loginTwoFactorForm from './forms/loginTwoFactor';
import registerForm from './forms/register';
import verifyEmailForm from './forms/verifyEmail';

export default combineReducers({
  app,
  currentUser,
  enableTwoFactorAuthForm,
  loginForm,
  loginTwoFactorForm,
  registerForm,
  verifyEmailForm,
  ui,
});
