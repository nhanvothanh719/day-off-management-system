export const loginSuccess = (userInfo) => ({
    type: 'LOGIN_SUCCESS',
    payload: userInfo,
});

export const logoutSuccess = () => ({
  type: 'LOGOUT_SUCCESS',
});