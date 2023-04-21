export const setAccessToken = (accessToken) => ({
    type: 'SET_ACCESS_TOKEN',
    payload: accessToken,
});

export const clearAccessToken = () => ({
  type: 'CLEAR_ACCESS_TOKEN',
});