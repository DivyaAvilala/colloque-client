import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

function addQueryParams(url, params) {
  let newUrl = url + "?";
  for (let key in params) {
    newUrl += key + "=" + params[key] + "&";
  }
  newUrl = newUrl.substr(0, newUrl.length - 1);
  return newUrl;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  addQueryParams,
  setJwt,
};
