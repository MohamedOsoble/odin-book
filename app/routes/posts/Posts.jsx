import { useLoaderData } from "react-router";
import * as API from "../../api/posts";
import PostList from "../../components/Post";
import CreatePost from "../../components/CreatePost";
import { useUser } from "../../contexts/UserContexts";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";

export async function clientLoader({ params }) {
  const param = params.route;
  let response;
  switch (param) {
    case "recent":
      return await API.recent();
      break;
    case "following":
      return await API.following();
      break;
    default:
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
