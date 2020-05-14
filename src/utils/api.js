import axios from "axios";

// TODO: figure out how to handle onSuccess / onFailure
export function makeReq(method, path, params, googleResponse) {
  const { tokenId } = googleResponse;

  axios
    .method(`${process.env.REACT_APP_API_URL}${path}`, {
      params,
      headers: { Authorization: tokenId }
    })
    .then(function(rsp) {
      // if successful, write data to state
      console.log("get rsp:", rsp);
    })
    .catch(function(error) {
      if (error.response.data.code === "user_not_found") {
        console.log("🤷‍♂️", error.response.data.name);
      } else {
        console.log(error);
      }
    });
}
