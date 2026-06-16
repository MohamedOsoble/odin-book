import { useLoaderData } from "react-router";
import { useUser } from "../../contexts/UserContexts";
import * as API from "../../api/search";

const API_URL = `${import.meta.env.VITE_API}`;

export async function clientLoader({ params }) {
  const response = await API.findUser(params.username);
  return response;
}

function Usercard({ user }) {
  return (
    <li className="list-row">
      <div>
        <img
          className="size-10 rounded-box"
          src={API_URL + user.profile.avatar}
        />
      </div>
      <div>
        <div>@{user.username}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          {user.profile.bio}
        </div>
      </div>
      <button className="btn outline-primary">Follow</button>
    </li>
  );
}

export default function Results({ params, loaderData }) {
  const usersList = loaderData.data;
  const { currentUser } = useUser();
  console.log(usersList);
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl">Search Results:</h1>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Users matching {params.username}
        </li>
        {usersList.length > 0
          ? usersList.map((user) => {
              return <Usercard user={user} />;
            })
          : null}
      </ul>
    </div>
  );
}
