import { useLoaderData } from "react-router";
import { allPosts } from "../../utils/placeholderPosts";
import * as API from "../../api/posts";
import Post from "../../components/Post";
import CreatePost from "../../components/CreatePost";
import { useUser } from "../../contexts/UserContexts";
import { useNavigate } from "react-router";

export async function clientLoader() {
  const posts = await API.popular();
  return posts.data;
}

function emptyPosts() {
  return (
    <div>
      <h1>There are no posts to display...</h1>
    </div>
  );
}

export default function Explore({ loaderData }) {
  const { user } = useUser();
  return (
    <div className="flex flex-col justify-between">
      <h1 className="justify-self-center self-center border-grey-100 text-6xl font-bold pb-10">
        Explore Posts
      </h1>
      {CreatePost(user)}
      <div className="flex flex-col p-6 dark:border-gray-700 space-y-4 m-5">
        {loaderData.length > 1 ? (
          <div>
            {loaderData.map((post) => {
              return Post(post, {
                id: post.author.id,
                username: post.author.username,
                avatar: post.author.profile.avatar,
              });
            })}
          </div>
        ) : (
          emptyPosts()
        )}
      </div>
    </div>
  );
}
