import { useLoaderData } from "react-router";
import { useState } from "react";
import * as API from "../../api/profile";
import Post from "../../components/Post";
import { dateToInput } from "../../utils/utility";

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

// This is going to take more work, fix edit profile first and move this to another file, combine image uploads in general...
function UploadAvatar({ username, setChangeAvatar }) {
  const verifyFileType = (file) => {
    const arr = file.type.split("/");
    return arr[0] === "image";
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const avatar = e.target.avatar.files;
    const isImage = verifyFileType(avatar[0]);
    if (!isImage) {
      console.log("Please submit the correct filetype...");
      return false;
    } else {
      const form = new FormData(e.target);
      const response = await API.uploadAvatar(username, form);
      return response;
    }
  };

  return (
    <div className="flex flex-col max-w-35">
      <form className="flex flex-col" onSubmit={handleUpload}>
        <input id="avatar" name="avatar" type="file" />
        <button className="btn w-25" type="submit">
          Upload
        </button>
        <button
          className="btn w-25"
          onClick={() => {
            setChangeAvatar(false);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export function loadAvatar(profile) {}

function ProfileCard({ profile, setEditing }) {
  console.log(profile);
  return (
    <div className="max-w-xl min-w-2xl flex-col justify-items-center border-2 border-solid rounded-md">
      <div className="flex flex-row min-w-xl mt-10 ">
        <div className="flex flex-col">
          {" "}
          <img
            src={"http://localhost:3000/" + profile.avatar}
            className="rounded-4xl w-35 object-scale-down"
          ></img>{" "}
          <button className="btn" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </div>

        <div className="max-w-2xl ml-12">
          <h1 className="text-3xl">{profile.user.username}'s Profile</h1>
          <p>
            <strong>Name: </strong>{" "}
            {profile.name ? profile.name : "Nameless user"}
          </p>
          <div className="flex flex-row pb-2 pt-2">
            <p className="">
              <strong>Bio: </strong>
            </p>
            <p> {profile.bio}</p>
          </div>

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
  );
}

function EditProfile({ profile, setProfile, setEditing }) {
  const [details, setDetails] = useState({
    profileId: profile.profileId,
    name: profile.name,
    bio: profile.bio,
    dob: profile.dob,
    avatar: profile.avatar,
  });
  const [changeAvatar, setChangeAvatar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await API.updateProfile(profile.user.username, details);
    console.log(response);
    setEditing(false);
    setProfile(response);
  };

  return (
    <div className="p-5 max-w-xl min-w-2xl flex flex-row justify-items-center border-2 border-solid rounded-md">
      <div className="flex flex-col p-5">
        <img
          src={"http://localhost:3000/" + profile.avatar}
          className="rounded-4xl w-35 object-scale-down"
        ></img>{" "}
        {changeAvatar ? (
          <UploadAvatar
            username={profile.user.username}
            setChangeAvatar={setChangeAvatar}
          />
        ) : (
          <button
            className="btn"
            onClick={() => {
              setChangeAvatar(true);
            }}
          >
            New Avatar
          </button>
        )}
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div>
          {" "}
          <label for="name">Name:</label>
          <input
            name="name"
            type="text"
            placeholder={profile.name}
            onChange={handleChange}
            value={details.name ? details.name : ""}
          ></input>
        </div>
        <div>
          <label for="bio">Bio: </label>
          <textarea
            name="bio"
            className="border border-default-medium rounded-md text-heading   
            text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 
            py-2.5 shadow-xs placeholder:text-body resize-none min-w-md"
            maxLength={150}
            rows={4}
            placeholder={profile.bio}
            value={details.bio ? details.bio : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label for="dob">Birthdate: </label>
          <input
            name="dob"
            type="date"
            placeholder={profile.dob}
            value={details.dob ? dateToInput(details.dob) : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

function Tab(profile) {
  const [selected, setSelected] = useState("Posts");

  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  return (
    <div className="flex flex-col max-w-xl mx-auto pb-7">
      <div className="flex flex-row justify-center pt-15">
        <button
          className="btn border-2 rounded-sm p-2.5 m-2"
          onClick={handleChange}
          value="Posts"
        >
          Posts
        </button>
        <button
          className="btn border-2 rounded-sm p-2.5 m-2"
          onClick={handleChange}
          value="Comments"
        >
          Comments
        </button>
        <button
          type="submit"
          className="btn border-2 rounded-sm p-2.5 m-2"
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
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(loaderData.profile);
  const handleEdit = (e) => {};
  const handleUpload = (e) => {
    setUpload(!upload);
  };
  return (
    <div>
      {editing ? (
        <EditProfile
          profile={profile}
          setProfile={setProfile}
          setEditing={setEditing}
        />
      ) : (
        <ProfileCard
          profile={profile}
          setProfile={setProfile}
          setEditing={setEditing}
        />
      )}

      {Tab(profile)}
    </div>
  );
}
