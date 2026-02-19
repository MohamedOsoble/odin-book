import { useLoaderData } from "react-router";
import { allPosts } from "../../utils/placeholderPosts";

export async function clientLoader() {
  const posts = allPosts();
  return posts;
}

function createPost(posts) {
  return posts.map((post) => (
    <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4 m-5">
      <h1 className="text-lg font-bold">{post.title}</h1>
      <p>{post.body}</p>
      <div className="flex">
        <button
          className="rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
          type="submit"
        >
          Like
        </button>
        <button
          className="rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
          type="submit"
        >
          Comment
        </button>
        <button
          className="rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
          type="submit"
        >
          Share
        </button>
      </div>
    </div>
  ));
}

export default function Explore({ loaderData }) {
  const posts = loaderData.filter((post) => post.id <= 15);
  return (
    <div className="flex flex-col">
      <h1 className="justify-self-center self-center border-grey-100 text-6xl font-bold pb-10">
        Explore Posts
      </h1>
      {createPost(posts)}
    </div>
  );
}
