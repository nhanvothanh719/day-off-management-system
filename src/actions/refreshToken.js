export const setRefreshToken = (refreshToken) => ({
    type: 'SET_REFRESH_TOKEN',
    payload: refreshToken,
});

export const clearRefreshToken = () => ({
  type: 'CLEAR_REFRESH_TOKEN',
});