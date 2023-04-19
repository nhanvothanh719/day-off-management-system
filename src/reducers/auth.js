const initialState = {
  userPermissions: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER_PERMISSIONS":
      return { ...state, userPermissions: action.payload };
    default:
      return state;
  }
};
