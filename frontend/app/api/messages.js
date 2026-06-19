import axios from "axios";

const URL = `${import.meta.env.VITE_API}messages/`;
const options = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure Axios includes cookies in the request
};

export async function getMessageHome() {
  const response = await axios.get(URL, options).catch(function (err) {
    return err.response.data;
  });
  return response;
}
