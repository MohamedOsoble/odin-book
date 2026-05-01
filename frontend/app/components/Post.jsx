import { useUser } from "../contexts/UserContexts";
import { useState } from "react";
import { likePost } from "../api/posts";

export default function Post(post, author) {
  const { user } = useUser();
  const [likes, setLikes] = useState(post._count.likedby.toString());

  const handleLike = async (event) => {
    const response = await likePost(post.id);
    setLikes(response.data._count.likedby.toString());
  };

  const handleDelete = (event) => {
    console.log("Deleting post...");
  };

  const handleComment = (event) => {
    console.log("Supposed to open reply textbox or something");
  };

  const handleShare = (event) => {
    console.log("Supposed to open a popup to allow post sharing...");
  };
  return (
    <div
      className="flex flex-col rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4 m-5 justify-between"
      key={post.id}
    >
      <div className="min-w-xl mt-10 ">
        <a
          href={"/profile/" + author.username}
          className="flex flex-row justify-items-center items-center justify-between w-33"
        >
          <img
            src={author.avatar}
            className="rounded-4xl w-15 object-scale-down"
          ></img>
          <b>{author.username}</b>
        </a>
      </div>
      <p>{post.content}</p>
      {user ? (
        <div className="flex">
          <button
            className="rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
            type="submit"
            onClick={handleLike}
          >
            Like
          </button>
          <button
            className="rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
            type="submit"
            onClick={handleComment}
          >
            Comment
          </button>
          <button
            className="rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
            type="submit"
            onClick={handleShare}
          >
            Share
          </button>
          {user.id === author.id ? (
            <button
              className="text-red-500 rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
              type="submit"
              onClick={handleDelete}
            >
              Delete
            </button>
          ) : null}
        </div>
      ) : (
        <p className="text-xs text-gray-500">
          Please <a href="/login">Login</a> to like or comment on this post
        </p>
      )}

      <p className="text-xs text-gray-500">Likes: {likes}</p>
      <p className="text-xs text-gray-500">
        Created:
        {new Date(post.createdAt).toString()}
      </p>
    </div>
  );
}
