import axios from "axios";

const URL = `${import.meta.env.VITE_API}search/`;
const options = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure Axios includes cookies in the request
};

export async function findUser(username) {
  const response = await axios
    .get(URL + "users/" + username)
    .catch(function (err) {
      return err.response.data;
    });
  return response;
}

export async function findPosts(term) {
  const response = await axios.get(URL + "posts/" + term).catch(function (err) {
    return err.response.data;
  });
  return response;
}
