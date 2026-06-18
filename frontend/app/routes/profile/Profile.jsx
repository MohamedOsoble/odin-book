import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import * as API from "../../api/profile";
import PostList from "../../components/Post";
import { useUser } from "../../contexts/UserContexts";
import { PostCommentCard } from "../../components/Comment";
import { LoadingComponent } from "../../components/Loading";
import {
  stringMaxLength,
  capitalizeFirst,
  dateToInput,
} from "../../utils/utility";

export async function clientLoader({ params }) {
  const profileData = await API.getProfile(params.username);
  return profileData;
}

function LoadPosts(props) {
  const { profile, posts, empty } = props;
  const author = {
    id: profile.userId,
    username: profile.user.username,
    avatar: profile.avatar,
  };
  console.log(posts);

  if (posts.length < 1) {
    return <h1>This user has not {empty} any posts</h1>;
  } else {
    return (
      <div>
        <PostList postList={posts} />
      </div>
    );
  }
}

function LoadComments({ comments }) {
  if (comments.length < 1) {
    return (
      <div>
        <h1>This user has not made any comments</h1>
      </div>
    );
  } else {
    return (
      <div>
        {comments.map((comment) => {
          return <PostCommentCard comment={comment} />;
        })}
      </div>
    );
  }
}

// This is going to take more work, fix edit profile first and move this to another file, combine image uploads in general...
function UploadAvatar({
  username,
  setChangeAvatar,
  profile,
  setProfile,
  setPreview,
}) {
  const verifyFileType = (file) => {
    const arr = file.type.split("/");
    return arr[0] === "image";
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const avatar = e.target.avatar.files;
    const isImage = verifyFileType(avatar[0]);
    if (!isImage) {
      return false;
    } else {
      const form = new FormData(e.target);
      const response = await API.uploadAvatar(username, form);
      setProfile({ ...profile, avatar: response.avatar });
      setChangeAvatar(false);
      return response;
    }
  };

  const handleCancel = (e) => {
    setPreview("");
    setChangeAvatar(false);
  };

  const handlePreview = (e) => {
    const [file] = e.target.files;
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col max-w-35">
      <form className="flex flex-col" onSubmit={handleUpload}>
        <input
          className="btn btn-sm mt-2"
          accept="image/*"
          id="avatar"
          name="avatar"
          type="file"
          onChange={handlePreview}
        />
        <div className="flex flex-row">
          <button className="btn btn-xs m-3" type="submit">
            Upload
          </button>
          <button className="btn btn-xs m-3" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function FollowButton({ isFollowing, onClick }) {
  return (
    <div>
      <button className="btn" onClick={onClick}>
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

function ProfileCard({
  profile,
  avatarSrc,
  setProfile,
  setEditing,
  isFollowing,
  setIsFollowing,
  currentUser,
}) {
  const handleFollow = async (e) => {
    try {
      const response = isFollowing
        ? await API.follow(profile.user.username, "unfollow")
        : await API.follow(profile.user.username, "follow");
      if (response) {
        setIsFollowing(!isFollowing);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl min-w-2xl flex-col justify-items-center border-2 border-solid rounded-md">
      <div className="flex flex-row min-w-xl mt-10 ml-5 ">
        <div className="flex flex-col">
          <img
            id="profile-avatar"
            src={avatarSrc}
            className="rounded-4xl w-35 object-scale-down"
          ></img>{" "}
          {currentUser && currentUser.id === profile.user.id ? (
            <button className="btn" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          ) : null}
        </div>

        <div className="max-w-2xl ml-12">
          <div className="flex flex-row justify-between">
            <h1 className="text-3xl">{profile.user.username}'s Profile</h1>
            {currentUser.id === profile.user.id ? null : (
              <FollowButton isFollowing={isFollowing} onClick={handleFollow} />
            )}
          </div>
          <p>
            <strong>Name: </strong>{" "}
            {profile.name ? profile.name : "Nameless user"}
          </p>
          <div className="flex flex-row pb-2 pt-2">
            <p className="">
              <strong>Bio: </strong>
            </p>
            <p> {" " + profile.bio}</p>
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
        <button
          className="pr-2.5 underline"
          onClick={() => document.getElementById("following-modal").showModal()}
        >
          Following: {profile.user.following.length}
        </button>
        <FollowList
          followers={profile.user.following}
          type={"following"}
          id={"following-modal"}
        />
        <FollowList
          followers={profile.user.followers}
          type={"follower"}
          id={"follower-modal"}
        />
        <button
          className="pl-2.5 underline"
          onClick={() => document.getElementById("follower-modal").showModal()}
        >
          Followers: {profile.user.followers.length}
        </button>
      </div>
    </div>
  );
}

function EditProfile({
  profile,
  avatarSrc,
  setProfile,
  setEditing,
  preview,
  setPreview,
}) {
  const [details, setDetails] = useState(profile);
  const [changeAvatar, setChangeAvatar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await API.updateProfile(profile.user.username, details);
    setEditing(false);
    if (response.status === 200) {
      setProfile(response.data);
    } else {
      // Some sort of error notification
    }
  };

  return (
    <div className="p-5 min-w-2xl flex flex-row justify-items-center border-2 border-solid rounded-md">
      <div className="flex flex-col p-5">
        {preview ? (
          <img
            id="avatar-preview"
            src={preview}
            className="rounded-4xl w-35 object-scale-down"
          ></img>
        ) : (
          <img
            id="profile-avatar"
            src={avatarSrc}
            className="rounded-4xl w-35 object-scale-down"
          ></img>
        )}
        {changeAvatar ? (
          <UploadAvatar
            username={profile.user.username}
            profile={profile}
            setProfile={setProfile}
            setChangeAvatar={setChangeAvatar}
            setPreview={setPreview}
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
      <form
        className="flex flex-col h-full justify-evenly"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row">
          {" "}
          <label for="name">Name:</label>
          <input
            name="name"
            className="ml-3 border border-default-medium rounded-md"
            type="text"
            placeholder={profile.name}
            onChange={handleChange}
            value={details.name ? details.name : ""}
          ></input>
        </div>
        <div className="flex flex-row">
          <label for="bio">Bio: </label>
          <textarea
            name="bio"
            className="border border-default-medium rounded-md text-heading   
            text-sm rounded-base focus:ring-brand focus:border-brand block w-75 px-3 
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
          <button
            className="btn"
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function FollowList({ followers, type, id }) {
  const Entry = ({ targetUser }) => {
    return (
      <div key={targetUser.id}>
        <a href={"/profile/" + targetUser.username} key={targetUser.id}>
          <div
            key={targetUser.id}
            className="flex flex-row items-center card-sm card-side h-20 bg-base-100 shadow-sm border border-gray-200 dark:border-gray-700  rounded-md"
          >
            <figure>
              <img
                src={`${import.meta.env.VITE_API}${targetUser.profile.avatar}`}
                className="rounded-full pl-2 w-12 h-12 rounded-full"
              />
            </figure>
            <div
              className="card-body flex flex-row items-center"
              key="follower-info"
            >
              <h3 className="card-title">{targetUser.username} </h3>
              <p> - {stringMaxLength(targetUser.profile.bio, 50)}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </a>
      </div>
    );
  };
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {type === "following"
            ? capitalizeFirst(type)
            : capitalizeFirst(type) + "s"}
        </h3>
        <div>
          {followers.map((follower) => {
            return <Entry targetUser={follower[type]} />;
          })}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

function Tab(profile, selected, setSelected) {
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
      {selected === "Posts" ? (
        <LoadPosts
          profile={profile}
          posts={profile.user.postsCreated}
          empty={"created"}
        />
      ) : null}
      {selected === "Comments" ? (
        <LoadComments comments={profile.user.comments} />
      ) : null}
      {selected === "Likes" ? (
        <LoadPosts
          profile={profile}
          posts={profile.user.postsLiked}
          empty={"liked"}
        />
      ) : null}
    </div>
  );
}

export default function Profile({ loaderData }) {
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(loaderData.profile);
  const avatarSrc = `${import.meta.env.VITE_API}${loaderData.profile.avatar}`;

  const [isFollowing, setIsFollowing] = useState(false);
  const [currentTab, setCurrentTab] = useState("Posts");
  const [preview, setPreview] = useState("");
  const { currentUser, isLoading } = useUser();

  useEffect(() => {
    if (
      !isLoading &&
      currentUser.following.some((item) => item.followingId === profile.user.id)
    ) {
      setIsFollowing(true);
    }
  }, [currentUser]);

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="mt-10">
      {editing ? (
        <EditProfile
          profile={profile}
          avatarSrc={avatarSrc}
          setProfile={setProfile}
          setEditing={setEditing}
          preview={preview}
          setPreview={setPreview}
          currentUser={currentUser}
        />
      ) : (
        <ProfileCard
          profile={profile}
          avatarSrc={avatarSrc}
          setProfile={setProfile}
          setEditing={setEditing}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
          preview={preview}
          currentUser={currentUser}
        />
      )}

      {Tab(profile, currentTab, setCurrentTab)}
    </div>
  );
}
