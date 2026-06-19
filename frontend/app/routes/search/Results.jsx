import { useLoaderData } from "react-router";
import { useUser } from "../../contexts/UserContexts";
import { LoadingComponent } from "../../components/Loading";
import * as API from "../../api/search";
import { follow } from "../../api/profile";
import { useState, useEffect } from "react";

const API_URL = `${import.meta.env.VITE_API}`;

export async function clientLoader({ params }) {
  const response = await API.findUser(params.username);
  return response;
}

function Usercard({ targetUser, currentUser, setError }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const handleFollow = async (e) => {
    try {
      const response = isFollowing
        ? await follow(targetUser.username, "unfollow")
        : await follow(targetUser.username, "follow");
      if (response) {
        setIsFollowing(!isFollowing);
      }
    } catch (err) {
      isFollowing
        ? setError("Failed to follow the user, please refresh and try again")
        : setError("Failed to unfollow the user, please refresh and try again");
    }
  };

  useEffect(() => {
    if (
      currentUser &&
      currentUser.following.some((item) => item.followingId === targetUser.id)
    ) {
      setIsFollowing(true);
    }
  }, [currentUser]);
  return (
    <li className="list-row" key={targetUser.id}>
      <div key="avatar">
        <img
          className="size-10 rounded-box"
          src={API_URL + targetUser.profile.avatar}
        />
      </div>
      <div>
        <a href={"/profile/" + targetUser.username}>
          <div key="username">@{targetUser.username}</div>
          <div className="text-xs uppercase font-semibold opacity-60" key="bio">
            {targetUser.profile.bio}
          </div>
        </a>
      </div>
      <div>
        {currentUser && currentUser.id != targetUser.id ? (
          <button className="btn" onClick={handleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        ) : null}
      </div>
    </li>
  );
}

export default function Results({ params, loaderData }) {
  const usersList = loaderData.data;
  const [error, setError] = useState(false);
  const { currentUser, isLoading } = useUser();

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="flex flex-col">
      {error ? <Alert message={error} setState={setError} /> : null}
      <h1 className="text-2xl">Search Results:</h1>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide" key="header">
          Users matching {params.username}
        </li>
        {usersList.length > 0
          ? usersList.map((user) => {
              return (
                <Usercard
                  targetUser={user}
                  currentUser={currentUser}
                  key={user.id}
                  setError={setError}
                />
              );
            })
          : null}
      </ul>
    </div>
  );
}
