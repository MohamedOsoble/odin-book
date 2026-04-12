import axios from "axios";

const URL = "http://localhost:3000/posts/";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure Axios includes cookies in the request
};

export async function explore() {
  const response = await axios
    .get(URL + "explore", options)
    .catch(function (err) {
      console.log(err);
      return err.response.data;
    });
  return response;
}
