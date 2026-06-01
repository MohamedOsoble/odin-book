import axios from "axios";

const URL = `${import.meta.env.VITE_API}profile/`;
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

export async function updateProfile(username, profile) {
  const response = await axios
    .post(URL + username + "/update", profile, options)
    .catch(function (err) {
      if (err.response.status === 401) {
        return err.response;
      }
    });
  return response;
}

export async function uploadAvatar(username, form) {
  const response = await axios
    .post(URL + username + "/avatar", form, {
      method: "POST",
      withCredentials: true, // Ensure Axios includes cookies in the request
    })
    .catch(function (err) {
      if (err.response.status === 401) {
        return err.response;
      }
    });
  return response;
}

export async function follow(username, action) {
  const response = await axios
    .get(URL + username + "/" + action, {
      method: "GET",
      withCredentials: true,
    })
    .catch(function (err) {
      return err.response;
    });
  return response;
}
