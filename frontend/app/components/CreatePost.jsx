import { useState } from "react";
import { create } from "../api/posts";
import { redirect } from "react-router";
import { useUser } from "../contexts/UserContexts";
import { LoadingComponent } from "./Loading";

export default function createPost() {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState(false);
  const { currentUser, isLoading } = useUser();

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (currentUser) {
    return (
      <PostForm
        currentUser={currentUser}
        content={content}
        setContent={setContent}
        errors={errors}
        setErrors={setErrors}
      />
    );
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

export function PostForm({
  currentUser,
  content,
  setContent,
  errors,
  setErrors,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length > 300 || content.length < 3) {
      setErrors(true);
    } else {
      const response = await create(currentUser.id, content);
      redirect("/post/" + response.data.id);
    }
  };

  const handleClear = (e) => {
    setContent("");
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Create Post: </legend>
            <textarea
              className="textarea h-24 resize-none"
              maxLength={300}
              rows={4}
              placeholder="What's on your mind..."
              onChange={handleChange}
            ></textarea>
          </fieldset>
          {/* <textarea
            className="border border-default-medium rounded-md text-heading 
            text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 
            py-2.5 shadow-xs placeholder:text-body resize-none min-w-md"
            maxLength={300}
            rows={4}
            placeholder="What's on your mind..."
            onChange={handleChange}
          /> */}
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
