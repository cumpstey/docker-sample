export const getUserFullName = state => `${state.user.firstName} ${state.user.lastName}`;

export const canSubmitLoginForm = state => Boolean(
  state.loginForm.fields.email.value &&
  state.loginForm.fields.password.value,
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
