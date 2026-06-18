import { useLoaderData } from "react-router";
import { allPosts } from "../../utils/placeholderPosts";
import * as API from "../../api/posts";
import PostList from "../../components/Post";
import CreatePost from "../../components/CreatePost";
import { useUser } from "../../contexts/UserContexts";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";

export async function clientLoader({ params }) {
  const param = params.route;
  console.log(param);
  let response;
  switch (param) {
    case "recent":
      console.log("Recent Route");
      return await API.recent();
      break;
    case "following":
      console.log("Following Route");
      return await API.following();
      break;
    default:
      console.log("Default route");
      return await API.popular();
  }
}

export function emptyPosts() {
  return (
    <div>
      <h1>There are no posts to display...</h1>
    </div>
  );
}

export default function Posts({ params, loaderData }) {
  const posts = loaderData.data;
  return (
    <>
      <CreatePost />
      <PostList postList={posts} />
    </>
  );
}
