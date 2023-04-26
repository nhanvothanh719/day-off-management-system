import axios from "axios";
import store from "../store";
import { setAccessToken } from "../actions/accessToken";

// export const baseURL = "https://backend-logoff.onrender.com/api";

export const baseURL = "http://localhost:8000/api";

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Set Bearer token
axiosClient.interceptors.request.use(async function (config) {
  const state = store.getState();
  const accessTokenLifeTime = state.accessToken.lifeTime;
  const accessTokenLifeTimeRemain = accessTokenLifeTime * 1000 - Date.now();
  if(accessTokenLifeTimeRemain  <= 0) {
    const refreshToken = state.refreshToken;
    await axios.post(baseURL + "/auth/get-new-access-token", {refreshToken}, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      const { accessToken, accessTokenLifeTime } = res.data;
      store.dispatch(setAccessToken({ token: accessToken, lifeTime: accessTokenLifeTime }));
    })
    .catch((error) => {
      alert('Your session is timeout. Please logout and login again!');
    });
  }
  const accessToken = state.accessToken.token;
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  return config;
});

export default axiosClient;