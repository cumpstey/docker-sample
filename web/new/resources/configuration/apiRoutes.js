const api = {
  // Authentication and account management
  login: (p) => `${ p.root }/account/authenticate`,
  validatePasswordToken: (p) => `${ p.root }/password/create/${ p.token }/validate`,
  createPassword: (p) => `${ p.root }/password/create/${ p.token }`,
  sendResetPassword: (p) => `${ p.root }/password/email`,
  resetPassword: (p) => `${ p.root }/password/reset`,
  validatePasswordResetToken: (p) => `${ p.root }/password/reset/${ p.token }/validate`,

  // User profile and support
  me: (p) => `${ p.root }/account/me`,
  myPassword: (p) => `${ p.root }/me/password`,

  // Values
  values: (p) => `${ p.root }/values`,
};

const get = function(endpoint, params) {
  params = { ...params, root: '/api/v1' };
  return api[endpoint](params);
}

export default {
  get,
};
