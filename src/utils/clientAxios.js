import axios from "axios";
import store from "../store";
import { setAccessToken } from "../actions/accessToken";

export const baseURL = "http://localhost:8000/api";

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Set Bearer token
axiosClient.interceptors.request.use(function (config) {
  const state = store.getState();
  const accessTokenLifeTime = state.accessToken.lifeTime;
  const refreshToken = state.refreshToken;
  if(accessTokenLifeTime * 1000 - Date.now()  <= 0) {
    axios.post(baseURL + "/auth/get-new-access-token", {refreshToken}, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const { accessToken, accessTokenLifeTime } = res.data;
      store.dispatch(setAccessToken({ accessToken, accessTokenLifeTime }));
    })
    .catch((error) => {
      console.log(error);
      //Redirect user to login page --> Reset data from Redux
    });
  }
  const accessToken = state.accessToken.token;
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  return config;
});

export default axiosClient;