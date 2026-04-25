import axios from "axios";

const URL = "http://localhost:3000/profile/";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure Axios includes cookies in the request
};

export async function getProfile(username) {
  const response = await axios.get(URL + username).catch(function (error) {
    if (error.response.status === 401) {
      return error.response;
    }
  });
  return response.data;
}
