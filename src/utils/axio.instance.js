import axios from "axios";
import authServices from "@services/auth";
import queryString from "query-string";
// const baseAPI_URL = "http://jsonplaceholder.typicode.com/";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 300000,
  withCredentials: false,
  headers: {
    // Accept: "application/json",
    "content-type": "application/json",
  },
  responseType: "json",
  // transformRequest: [
  //   (data, headers) => {
  //     // do something with data
  //     return data;
  //   },
  // ],
});

export default axiosInstance;

//#region interceptors
axiosInstance.interceptors.request.use(
  (request) => {
    // Do something before request is sent
    const accessToken = getLocalAccessToken();
    if (accessToken !== null) {
      request.headers["Authorization"] = "Bearer " + accessToken;
    }

    return request;
  },
  (requestError) => {
    return Promise.reject(requestError);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Return a successful response back to the calling service
    if (response && response.data) return response.data;

    return response;
  },
  (responseError) => {
    // Remove token relate to auth
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    window.location.href = "/login";

    // Return any error which is not due to authentication back to the calling service
    console.log(responseError.response.data.config.url);

    if (responseError.response.status !== 401) {
      return Promise.reject(responseError);
    }
    /*
     * When response code is 401, try to refresh the token.
     * Eject the interceptor so it doesn't loop in case
     * token refresh causes the 401 response
     */
    axios.interceptors.response.eject(axiosInstance);
    const params = {
      refresh_token: getLocalRefreshToken(),
    };

    authServices.refreshToken(params).then((rs) => {
      localStorage.setItem("accessToken", rs.data.access_token);
      referedEvent(responseError.response);
    });
  }
);
//#endregion

//#region functions support for axios callback
const getLocalAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const getLocalRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

// const referedEvent = (res) => {
//   console.log(res);
//   const url = res.url;
//   const data = res.data;

//   switch (res.method) {
//     case "get":
//       axios.get(url, data);
//       break;

//     case "post":
//       break;
//   }
// };
//#endregion
