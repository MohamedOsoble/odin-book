import axios from "axios";

const URL = `${import.meta.env.VITE_API}posts/`;
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure Axios includes cookies in the request
};

// export async function like(userId, postId) {
//   // input userid and postid, hit api to update like.
//   const response = await axios
//     .post(URL + postId + "/like", { postId, userId })
//     .catch(function (err) {
//       console.log(err);
//       return err.response.data;
//     });
//   return response;
// }

export async function popular() {
  const response = await axios
    .get(URL + "popular", options)
    .catch(function (err) {
      console.log(err);
      return err.response.data;
    });
  return response;
}

export async function following() {
  const response = await axios
    .get(URL + "following", options)
    .catch(function (err) {
      console.log(err);
      return err.response.data;
    });
  return response;
}

export async function recent() {
  const response = await axios
    .get(URL + "recent", options)
    .catch(function (err) {
      console.log(err);
      return err.response.data;
    });
  return response;
}

export async function create(userId, content) {
  const response = await axios
    .post(URL + "create", { userId, content })
    .catch(function (err) {
      console.log(err);
      return err.response.data;
    });
  return response;
}

export async function likePost(postId) {
  const response = await axios
    .get(URL + postId + "/like", options)
    .catch(function (err) {
      console.log(err);
      return err.response.data;
    });
  return response;
}

export async function getPost(postId) {
  const address = URL + "post/" + postId;
  const response = await axios.get(address, options).catch(function (err) {
    console.log(err);
    return err.response.data;
  });
  return response;
}

export async function submitComment(data) {
  const address = URL + "post/" + data.postId + "/comment";
  const response = await axios.post(address, data).catch(function (err) {
    console.error(err);
    return err.response.data;
  });
  return response;
}

export async function deletePost(postId) {
  const address = URL + "post/" + postId;
  const response = await axios.delete(address, options).catch(function (err) {
    console.log(err);
    return err.response.data;
  });
  return response;
}
