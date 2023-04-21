const initialState = {
  token: '',
  lifeTime: ''
};

const accessTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        token: action.payload.token,
        lifeTime: action.payload.lifeTime,
      };
    case "CLEAR_ACCESS_TOKEN":
      return {
        ...state,
        token: initialState.token,
        lifeTime: initialState.lifeTime,
      };
    default:
      return state;
  }
};

export default accessTokenReducer;
