const initialState = null;

const refreshTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_REFRESH_TOKEN":
      return action.payload;
    case "CLEAR_REFRESH_TOKEN":
      return initialState;
    default:
      return state;
  }
};

export default refreshTokenReducer;