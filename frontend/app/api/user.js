import axios from "axios";

const URL = "http://localhost:3000/user/";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure Axios includes cookies in the request
};

export async function login(user) {
  const response = await axios
    .post(URL + "login", user, options)
    .catch(function (error) {
      if (error.response.status === 401) {
        return error.response;
      }
    });
  return response;
}

export async function logout() {
  const response = await axios
    .get(URL + "logout", options)
    .catch(function (error) {
      console.error(error.response.status);
    });
  return response;
}

export async function register(user) {
  console.log(user);
  const response = await axios
    .post(URL + "register", user, options)
    .catch(function (error) {
      return error.response;
    });
  return response;
}

export async function auth() {
  const response = await axios
    .get(URL + "checkAuth", options)
    .catch(function (error) {
      return error.response;
    });
  return response;
}
