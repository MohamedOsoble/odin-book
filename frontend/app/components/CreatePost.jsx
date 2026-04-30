import { useState } from "react";
import { create } from "../api/posts";

export default function createPost(user) {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState(false);
  if (user) {
    return PostForm(user, content, setContent, errors, setErrors);
  } else {
    return (
      <div>
        <p className="text-gray-400">
          Want to create a post? Please{" "}
          <a className="underline" href="/register">
            Register
          </a>{" "}
          or{" "}
          <a className="underline" href="/login">
            Login
          </a>
        </p>
      </div>
    );
  }
}

export function PostForm(user, content, setContent, errors, setErrors) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (content.length > 150) {
      setErrors(true);
    } else {
      const response = await create(user.id, content);
      event.target.reset();
    }
  };

  const handleClear = (event) => {
    setContent("");
  };

  const handleChange = () => {
    setContent(event.target.value);
  };
  return (
    <div className="flex flex-col">
      <h2 className="pb-2 underline">Create new post: </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <textarea
            className="border border-default-medium rounded-md text-heading 
            text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 
            py-2.5 shadow-xs placeholder:text-body resize-none min-w-md"
            maxLength={150}
            rows={4}
            placeholder="What's on your mind..."
            onChange={handleChange}
          />
          {errors ? (
            <p className=" w-inherit justify-self-center">
              Post content is too long
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
              Post
            </button>
            <button
              className="btn border-1 rounded-sm w-25 p-1 ml-10"
              type="reset"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
