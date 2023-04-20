const initialState = {
  isAuthenticated: false,
  user: {
    name: '',
    role: '',
    permissions: [],
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: {
          name: action.payload.name,
          role: action.payload.role,
          permissions: action.payload.permissions,
        },
      };
      
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isAuthenticated: false,
        user: initialState.user,
      };
    default:
      return state;
  }
};

export default authReducer;
