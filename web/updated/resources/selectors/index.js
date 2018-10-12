import { FORM_ID as ENABLE_TWO_FACTOR_AUTH_FORM_ID } from '../configuration/forms/enableTwoFactorAuth';
import { FORM_ID as LOGIN_FORM_ID } from '../configuration/forms/login';
import { FORM_ID as REGISTER_FORM_ID } from '../configuration/forms/register';

export const getUserFullName = state => `${state.user.firstName} ${state.user.lastName}`;

export const canSubmitEnableTwoFactorAuthForm = state => Boolean(
  state[ENABLE_TWO_FACTOR_AUTH_FORM_ID].fields.code.value
);

export const canSubmitLoginForm = state => Boolean(
  state[LOGIN_FORM_ID].fields.email.value &&
  state[LOGIN_FORM_ID].fields.password.value
);

export const canSubmitRegisterForm = state => Boolean(
  state[REGISTER_FORM_ID].fields.firstName.value &&
  state[REGISTER_FORM_ID].fields.lastName.value &&
  state[REGISTER_FORM_ID].fields.email.value &&
  state[REGISTER_FORM_ID].fields.password.value
);

export const canSubmitForgotPasswordForm = state => Boolean(
  state.forgotPasswordForm.fields.email.value,
);

export const canSubmitCreatePasswordForm = state => Boolean(
  state.createPasswordForm.fields.password.value &&
  state.createPasswordForm.fields.confirmPassword.value,
);

export const canSubmitResetPasswordForm = state => Boolean(
  state.resetPasswordForm.fields.email.value &&
  state.resetPasswordForm.fields.password.value &&
  state.resetPasswordForm.fields.confirmPassword.value,
);
