import axios from "axios";

export function fetchFromAPI(method, path, data, token) {
  const url = `${process.env.REACT_APP_API_URL}/${path}`;
  const headers = { "Content-Type": "application/json" };

  // TODO: make sure cookie passed through in headers

  if (token == null) {
    console.log("No token!", token);
  }
  headers["Authorization"] = token;

  return axios({
    method,
    url,
    headers,
    withCredentials: true,
    data
  }).then(_checkStatus);
}

const _checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    throw error;
  }
};
