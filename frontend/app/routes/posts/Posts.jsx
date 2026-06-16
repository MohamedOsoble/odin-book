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

export function Posts2({ loaderData }) {
  const { currentUser } = useUser();
  const posts = loaderData.data;
  //console.log(loaderData);
  return (
    <div className="flex flex-col justify-between">
      <h1 className="justify-self-center self-center border-grey-100 text-6xl font-bold pb-10"></h1>
      {CreatePost(currentUser)}
      <div className="flex flex-col p-6 dark:border-gray-700 space-y-4 m-5">
        {posts.length >= 1 ? (
          <div>
            {posts.map((post) => {
              const author = {
                id: post.author.id,
                username: post.author.username,
                name: post.author.profile.name,
                avatar: post.author.profile.avatar,
              };
              return <Post post={post} author={author} />;
            })}
          </div>
        ) : (
          emptyPosts()
        )}
      </div>
    </div>
  );
}

export default function Posts({ params, loaderData }) {
  const posts = loaderData.data;
  return <PostList postList={posts} />;
}
