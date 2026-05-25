import { emptyPosts } from "./posts";
import Post from "../../components/Post";
import { following } from "../../api/posts";

export async function clientLoader() {
  const posts = await following();
  return posts.data;
}

export default function Popular({ loaderData }) {
  return (
    <div className="flex flex-col p-6 dark:border-gray-700 space-y-4 m-5">
      {loaderData.length > 1 ? (
        <div>
          {loaderData.map((post) => {
            const author = {
              id: post.author.id,
              username: post.author.username,
              avatar: post.author.profile.avatar,
            };
            return <Post post={post} author={author} />;
          })}
        </div>
      ) : (
        emptyPosts()
      )}
    </div>
  );
}
