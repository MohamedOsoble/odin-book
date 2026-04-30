import { useLoaderData } from "react-router";
import { useState } from "react";
import * as API from "../../api/profile";
import Post from "../../components/Post";

export async function clientLoader({ params }) {
  const profileData = await API.getProfile(params.username);
  return profileData;
}

function loadPosts(posts, profile) {
  if (posts.length < 1) {
    return <h1>There are no posts</h1>;
  } else {
    return (
      <div>
        {posts.map((post) => {
          return Post(post, {
            id: profile.userId,
            username: profile.user.username,
            avatar: profile.avatar,
          });
        })}
      </div>
    );
  }
}

function loadComments(comments) {
  return (
    <div>
      <h1> There are no comments </h1>
    </div>
  );
}

function loadLikes(likes) {
  return (
    <div>
      <h1>There are no liked posts...</h1>
    </div>
  );
}

function Tab(profile) {
  const [selected, setSelected] = useState("Posts");

  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  return (
    <div className="flex flex-col max-w-xl mx-auto pb-7">
      <div className="flex flex-row justify-center pt-15">
        <button
          className="border-2 rounded-sm p-2.5 m-2"
          onClick={handleChange}
          value="Posts"
        >
          Posts
        </button>
        <button
          className="border-2 rounded-sm p-2.5 m-2"
          onClick={handleChange}
          value="Comments"
        >
          Comments
        </button>
        <button
          type="submit"
          className="border-2 rounded-sm p-2.5 m-2"
          onClick={handleChange}
          value="Likes"
        >
          Likes
        </button>
      </div>
      {selected === "Posts"
        ? loadPosts(profile.user.postsCreated, profile)
        : null}
      {selected === "Comments" ? loadComments(profile.user.comments) : null}
      {selected === "Likes" ? loadLikes(profile.user.likes) : null}
    </div>
  );
}

export default function Profile({ loaderData }) {
  const [selected, setSelected] = useState(null);
  const profile = loaderData.profile;

  const handleChange = (event) => {};
  return (
    <div>
      <div className="max-w-xl min-w-2xl flex-col justify-items-center border-2 border-solid rounded-md">
        <div className="flex flex-row min-w-xl mt-10 ">
          <img
            src="https://cdn.imgchest.com/files/c31c0303ec2c.jpg"
            className="rounded-4xl w-35 object-scale-down"
          ></img>
          <div className="max-w-2xl ml-12">
            <h1 className="text-3xl">{profile.user.username}'s Profile</h1>
            <p>
              <strong>Name: </strong>{" "}
              {profile.name ? profile.name : "Nameless user"}
            </p>
            <p className="text-wrap">
              <strong>Bio: </strong>
              {profile.bio
                ? profile.bio
                : "The biography appears to be empty..."}
            </p>
            <p>
              <strong>Birthdate: </strong>
              {profile.dob
                ? " " + new Date(profile.dob).toDateString()
                : "This person was never born"}
            </p>
          </div>
        </div>
        <div className="flex flex-row max-w-sm mx-auto pb-7">
          <a href={"/profile/" + profile.user.username + "/following"}>
            <p className="pr-2.5 underline">
              Following: {profile.user.following.length}
            </p>
          </a>
          <a href={"/profile/" + profile.user.username + "/followers"}>
            <p className="pl-2.5 underline">
              Followers: {profile.user.followers.length}
            </p>
          </a>
        </div>
      </div>
      {Tab(profile)}
    </div>
  );
}
