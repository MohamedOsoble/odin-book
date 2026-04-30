import { useLoaderData } from "react-router";
import { allPosts } from "../../utils/placeholderPosts";
import * as API from "../../api/posts";
import Post from "../../components/Post";
import CreatePost from "../../components/CreatePost";
import { useUser } from "../../contexts/UserContexts";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";

export function emptyPosts() {
  return (
    <div>
      <h1>There are no posts to display...</h1>
    </div>
  );
}

export default function Posts({ loaderData }) {
  const { user } = useUser();
  return (
    <div className="flex flex-col justify-between">
      <h1 className="justify-self-center self-center border-grey-100 text-6xl font-bold pb-10"></h1>
      {CreatePost(user)}
      <Outlet />
    </div>
  );
}
