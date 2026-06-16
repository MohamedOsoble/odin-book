import { emptyPosts } from "./Posts";
import Post from "../../components/Post";
import { recent } from "../../api/posts";

export async function clientLoader() {
  const posts = await recent();
  return posts.data;
}

export default function Recent({ loaderData }) {
  return (
    <div className="flex flex-col p-6 dark:border-gray-700 space-y-4 m-5">
      {loaderData.length > 1 ? (
        <div>
          {loaderData.map((post) => {
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
  );
}
