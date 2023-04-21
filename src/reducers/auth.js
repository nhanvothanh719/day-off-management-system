const initialState = {
  isAuthenticated: false,
  userRole: '',
  userPermissions: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        userRole: action.payload.role,
        userPermissions: action.payload.permissions,
      };
      
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isAuthenticated: false,
        userRole: initialState.userRole,
        userPermissions: initialState.userPermissions,
      };
    default:
      return state;
  }
};

export default authReducer;
