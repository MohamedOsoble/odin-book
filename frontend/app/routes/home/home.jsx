import { emptyPosts } from "../posts/posts";
import Post from "../../components/Post";
import { popular } from "../../api/posts";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader() {
  const posts = await popular();
  return posts.data;
}

export default function Popular({ loaderData }) {
  return (
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
  );
}
