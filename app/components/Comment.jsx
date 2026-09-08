import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { submitComment } from "../api/posts";
import { useUser } from "../contexts/UserContexts";
import { chatDate } from "../utils/utility";
import { LoadingComponent } from "./Loading";
import * as API from "../api/posts";

const API_URL = `${import.meta.env.VITE_API}`;

export function CreateComment({
  postId,
  setCommenting,
  parentCommentId = null,
}) {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const redirect = () => {
    navigate("/post/" + postId);
  };

  // Assume validated prior to commenting
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length > 120) {
      setErrors(true);
      return;
    } else {
      const response = await submitComment({
        authorId: currentUser.id,
        postId: postId,
        content: content,
        parentCommentId: parentCommentId,
      });
      setContent("");
      setCommenting(false);
      redirect();
    }
  };
  return (
    <CommentBox
      content={content}
      setContent={setContent}
      setCommenting={setCommenting}
      errors={errors}
      handleSubmit={handleSubmit}
    />
  );
}

export function PostComment2({ comment }) {
  return (
    <div key={comment.id}>
      <div
        className="flex flex-col rounded-xl border border-gray-200 p-6 dark:border-gray-700 space-y-4 m-5 justify-evenly"
        key={comment.id}
      >
        <div className="min-w-xl">
          <a
            href={"/profile/" + comment.author.username}
            className="flex flex-row justify-items-center items-center justify-between w-33"
          >
            <img
              src={`${API_URL}${comment.author.profile.avatar}`}
              className="rounded-4xl w-15 object-scale-down"
            ></img>
            <b>{comment.author.username}</b>
          </a>
        </div>
        <p>{comment.content}</p>
        <p className="text-xs text-gray-500">
          Created:
          {new Date(comment.createdAt).toString()}
        </p>
      </div>
    </div>
  );
}

export function CreateReply({ postId, setCommenting }) {}

export function CommentBox({
  content,
  setContent,
  setCommenting,
  errors,
  handleSubmit,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <h2 className="pb-2 underline">Reply:</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <textarea
            className="border border-default-medium rounded-md text-heading 
            text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 
            py-2.5 shadow-xs placeholder:text-body resize-none min-w-md"
            maxLength={300}
            minLength={3}
            rows={4}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="What's on your mind..."
          />
          {errors ? (
            <p className=" w-inherit justify-self-center">
              Comment length must be between 3 and 300 characters...
            </p>
          ) : null}
          <div
            className="flex flex-row justify-center
          width-inherit p-5"
          >
            <button className="btn border-1 rounded-sm w-25 p-1" type="submit">
              Send
            </button>
            <button
              className="btn border-1 rounded-sm w-25 p-1 ml-10"
              type="reset"
              onClick={() => {
                setContent("");
              }}
            >
              Clear
            </button>
            <button
              className="btn border-1 rounded-sm w-25 p-1 ml-10"
              type="button"
              onClick={() => {
                setCommenting(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export function ReplyCommentCard({ comment, currentUser }) {}

export function PostCommentCard({ comment, currentUser }) {
  const [replying, setReplying] = useState(false);

  const navigate = useNavigate();

  const redirect = () => {
    navigate("/post/" + comment.postId);
  };

  const handleReply = (e) => {
    setReplying(!replying);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await API.deleteComment(comment.id);
    redirect();
  };
  return (
    <>
      <li className="list-row" key={comment.id}>
        <div href={"/profile/" + comment.author.username}>
          <img
            className="size-10 rounded-box"
            src={`${API_URL}${comment.author.profile.avatar}`}
          />
        </div>
        <a href={"/profile/" + comment.author.username}>
          <div>{comment.author.name}</div>
          <div className="text-xs font-semibold opacity-60">
            @{comment.author.username} on {chatDate(comment.createdAt)}
          </div>
        </a>
        <div className="list-col-wrap">
          {" "}
          <a className="list-col-wrap text-sm" href={"/post/" + comment.postId}>
            {comment.content}
          </a>
          {replying ? (
            <CreateComment
              postId={comment.postId}
              setCommenting={setReplying}
              parentCommentId={comment.id}
            />
          ) : null}
        </div>
        <div>
          <button
            className="btn btn-square btn-ghost items-center content-center"
            onClick={handleReply}
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
              class="lucide lucide-message-circle"
              aria-hidden="true"
            >
              <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
            </svg>
          </button>
        </div>
        {currentUser.id === comment.author.id ? (
          <>
            <div>
              <button
                className="btn btn-square btn-ghost items-center content-center"
                onClick={() =>
                  document
                    .getElementById(comment.id + "_delete_modal")
                    .showModal()
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
                <p className="text-xs text-red-500">X</p>
              </button>
            </div>

            <dialog id={comment.id + "_delete_modal"} className="modal">
              <div className="modal-box">
                <h3 className="text-lg font-bold">Delete comment?</h3>
                <p className="py-4">
                  Please note that this action cannot be undone.
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <button
                      className="btn text-green-500 rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
                      type="submit"
                      onClick={() =>
                        document
                          .getElementById(comment.id + "_delete_modal")
                          .close()
                      }
                    >
                      Cancel
                    </button>
                    <button
                      className="btn text-red-500 rounded-lg border border-gray-100 p-2 dark:border-gray-700 space-y-4 m-5"
                      type="submit"
                      onClick={handleDelete}
                    >
                      Delete comment
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </>
        ) : null}
      </li>
      {comment.replies && comment.replies.length > 0 ? (
        <ul className="list bg-base-100 rounded-box shadow-md p-4 pb-2 text-xs opacity-100 tracking-wide">
          <h2 className="pb-2 underline">Replies:</h2>
          {comment.replies.map((reply) => {
            return (
              <PostCommentCard comment={reply} currentUser={currentUser} />
            );
          })}
        </ul>
      ) : null}{" "}
    </>
  );
}

export function CommentSection({ comments }) {
  const { currentUser, isLoading } = useUser();

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <ul className="list bg-base-100 rounded-box shadow-md p-4 pb-2 text-xs opacity-100 tracking-wide">
      <h2 className="pb-2 underline">Comments:</h2>
      {comments.map((comment) => {
        return <PostCommentCard comment={comment} currentUser={currentUser} />;
      })}
    </ul>
  );
}
