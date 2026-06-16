import { useUser } from "../contexts/UserContexts";
import { CreateComment } from "./Comment";
import { useState } from "react";
import { likePost, deletePost } from "../api/posts";

const API = `${import.meta.env.VITE_API}`;

// Need to move the state out of the component since it can be conditionally rendered...

export default function Post({ post, author }) {
  const { user } = useUser();
  const [likes, setLikes] = useState(post.likedby.length);
  const [commenting, setCommenting] = useState(false);

  const handleLike = async (e) => {
    const response = await likePost(post.id);
    console.log(response);
    setLikes(response.data.likedby.length);
  };

  const handleDelete = async (e) => {
    const response = await deletePost(post.id);
    console.log(response);
  };

  const handleComment = (e) => {
    setCommenting(!commenting);
    console.log("Supposed to open reply textbox or something");
  };

  const handleShare = (e) => {
    console.log("Supposed to open a popup to allow post sharing...");
  };
  return (
    <div key={post.id}>
      <div
        className="flex flex-col rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4 m-5 justify-between"
        key={post.id}
      >
        <div className="min-w-xl">
          <a
            href={"/profile/" + author.username}
            className="flex flex-row justify-items-center items-center justify-between w-33"
          >
            <img
              src={`${API}${author.avatar}`}
              className="rounded-4xl w-15 object-scale-down"
            ></img>
            <b>{author.username}</b>
          </a>
        </div>
        <a href={"/post/" + post.id}>
          <p>{post.content}</p>
        </a>
        {user ? (
          <div className="flex">
            <button
              className="btn rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
              type="submit"
              onClick={handleLike}
            >
              Like
            </button>
            <button
              className="btn rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
              type="submit"
              onClick={() => {
                setCommenting(!commenting);
              }}
            >
              Comment
            </button>
            <button
              className="btn rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
              type="submit"
              onClick={handleShare}
            >
              Share
            </button>
            {user.id === author.id ? (
              <>
                <button
                  className="btn text-red-500 rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
                  onClick={() =>
                    document.getElementById("delete_modal").showModal()
                  }
                >
                  Delete
                </button>
                <dialog id="delete_modal" className="modal">
                  <div className="modal-box">
                    <h3 className="text-lg font-bold">Delete Post?</h3>
                    <p className="py-4">
                      Please note that this action cannot be undone.
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        <button
                          className="btn text-green-500 rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
                          type="submit"
                          onClick={() =>
                            document.getElementById("delete_modal").close()
                          }
                        >
                          Cancel
                        </button>
                        <button
                          className="btn text-red-500 rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
                          type="submit"
                          onClick={handleDelete}
                        >
                          Delete Post
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </>
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
      {commenting ? (
        <CreateComment postId={post.id} setCommenting={setCommenting} />
      ) : null}
    </div>
  );
}
