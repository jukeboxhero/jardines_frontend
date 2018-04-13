const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  FACEBOOK_SIGNIN: 'FACEBOOK_SIGNIN',
  GOOGLE_OAUTH2_SIGNIN: 'GOOGLE_OAUTH2_SIGNIN',
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: (credentials={}) => ({
    type: actions.LOGIN_REQUEST
  }),
  logout: () => ({
    type: actions.LOGOUT
  }),
  loginError: () => ({
    type: actions.LOGIN_ERROR
  })
};
export default actions;
