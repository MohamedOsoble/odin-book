import { useState, useRef } from "react";
import { useNavigate } from "react-router";

export function CreateComment({ postId, setCommenting }) {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {};
  return (
    <CommentBox
      content={content}
      setContent={setContent}
      errors={errors}
      setErrors={setErrors}
    />
  );
}

export function CommentBox({
  content,
  setContent,
  setCommenting,
  errors,
  setErrors,
}) {
  const handleSubmit = (e) => {
    e.preDefault();
    if (content.length > 120) {
      setErrors(true);
      return;
    }
    console.log(content);
  };

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
            rows={4}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="What's on your mind..."
          />
          {errors ? (
            <p className=" w-inherit justify-self-center">
              Comment is too long
            </p>
          ) : null}
          <div
            className="flex flex-row justify-center
          width-inherit p-5"
          >
            <button
              onClick={handleSubmit}
              className="btn border-1 rounded-sm w-25 p-1"
              type="submit"
            >
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
