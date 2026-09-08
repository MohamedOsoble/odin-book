import { useUser } from "../contexts/UserContexts";
import { CreateComment } from "./Comment";
import { useEffect, useState } from "react";
import { likePost, deletePost } from "../api/posts";
import { chatDate } from "../utils/utility";
import { LoadingComponent } from "./Loading";
import { useNavigate } from "react-router";

const API_URL = `${import.meta.env.VITE_API}`;

function LikeSvg({ liked }) {
  if (liked) {
    return (
      <svg
        className="size-[1.2em]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          fill="red"
          stroke="currentColor"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
        </g>
      </svg>
    );
  }
  return (
    <svg
      className="size-[1.2em]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2"
        fill="none"
        stroke="currentColor"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
      </g>
    </svg>
  );
}

function Post({ post, author, currentUser }) {
  const [likes, setLikes] = useState(post.likedby);
  const [commenting, setCommenting] = useState(false);
  const [likedByMe, setLikedByMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (likes.some((x) => x.id === currentUser.id)) {
      setLikedByMe(true);
    } else {
      setLikedByMe(false);
    }
  }, [likes]);

  const refresh = () => {
    navigate(0);
  };
  const handleLike = async (e) => {
    const response = await likePost(post.id);
    setLikes(response.data.likedby);
  };

  const handleDelete = async (e) => {
    const response = await deletePost(post.id);
    if (response) {
      refresh();
    }
    // Make a notification that the post has been deleted...
  };

  const handleComment = (e) => {
    setCommenting(!commenting);
  };

  const handleShare = (e) => {
    // Currently not implemented, might do in a future update...
  };

  return (
    <li className="list-row" key={post.id}>
      <div href={"/profile/" + author.username}>
        <img
          className="size-10 rounded-box"
          src={`${API_URL}${author.avatar}`}
        />
      </div>
      <a href={"/profile/" + author.username}>
        <div>{author.name}</div>
        <div className="text-xs font-semibold opacity-60">
          @{author.username} on {chatDate(post.createdAt)}
        </div>
      </a>
      <div className="list-col-wrap">
        {" "}
        <a className="list-col-wrap text-sm" href={"/post/" + post.id}>
          {post.content}
        </a>
        {commenting ? (
          <CreateComment postId={post.id} setCommenting={setCommenting} />
        ) : null}
      </div>

      <div>
        <button className="btn btn-square btn-ghost" onClick={handleLike}>
          <LikeSvg liked={likedByMe} />
          <p className="text-xs text-gray-500">{likes.length}</p>
        </button>
      </div>
      <div>
        <button
          className="btn btn-square btn-ghost items-center content-center"
          onClick={handleComment}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-message-circle"
            aria-hidden="true"
          >
            <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
          </svg>
          <p className="text-xs text-gray-500">{post.comments.length}</p>
        </button>
      </div>
      {currentUser.id === author.id ? (
        <>
          <div>
            <button
              className="btn btn-square btn-ghost items-center content-center"
              onClick={() =>
                document.getElementById(post.id + "_delete_modal").showModal()
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
              <p className="text-xs text-red-500">X</p>
            </button>
          </div>

          <dialog id={post.id + "_delete_modal"} className="modal">
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
    </li>
  );
}
export default function PostList({ postList }) {
  const { currentUser, isLoading } = useUser();

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <ul className="list bg-base-100 rounded-box shadow-md p-4 pb-2 text-xs opacity-100 tracking-wide">
      {postList.map((post) => {
        const author = {
          id: post.author.id,
          username: post.author.username,
          name: post.author.profile.name,
          avatar: post.author.profile.avatar,
        };
        return (
          <Post
            post={post}
            author={author}
            currentUser={currentUser}
            key={post.id}
          />
        );
      })}
    </ul>
  );
}
