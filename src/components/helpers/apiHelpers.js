import axios from "axios";

export function fetchFromAPI(method, path, data, token) {
  const url = `${process.env.REACT_APP_API_URL}/${path}`;
  const headers = { "Content-Type": "application/json" };

  const apiToken = localStorage.getItem("api_token");
  console.log("local storage token:", apiToken);
  if (apiToken !== null) {
    headers["Authorization"] = apiToken;
  }

  if (token != null) {
    headers["Authorization"] = token;
  }

  return axios({
    method,
    url,
    headers,
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
