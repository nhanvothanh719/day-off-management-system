import { combineReducers } from "redux";
import accessTokenReducer from "./accessToken";
import authReducer from "./auth";
import refreshTokenReducer from "./refreshToken";

const rootReducer = combineReducers({
    auth: authReducer,
    accessToken: accessTokenReducer,
    refreshToken: refreshTokenReducer,
});

export default rootReducer;