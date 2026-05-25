import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { submitComment } from "../api/posts";
import { useUser } from "../contexts/UserContexts";

const API = `${import.meta.env.VITE_API}`;

export function CreateComment({
  postId,
  setCommenting,
  parentCommentId = null,
}) {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  // Assume validated prior to commenting
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length > 120) {
      setErrors(true);
      return;
    } else {
      const response = await submitComment({
        authorId: user.id,
        postId: postId,
        content: content,
        parentCommentId: parentCommentId,
      });
      console.log(response);
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

export function PostComment({ comment }) {
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
              src={`${API}${comment.author.profile.avatar}`}
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
  return (
    <div className="flex flex-col">
      <h2 className="pb-2 underline">Reply:</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <textarea
            className="border border-default-medium rounded-md text-heading 
            text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 
            py-2.5 shadow-xs placeholder:text-body resize-none min-w-md"
            maxLength={150}
            minLength={2}
            rows={4}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="What's on your mind..."
          />
          {errors ? (
            <p className=" w-inherit justify-self-center">
              Comment length must be between 2 and 150 characters...
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
export function replyComment({ postId }) {}
export default function CommentSection({ postId }) {}
