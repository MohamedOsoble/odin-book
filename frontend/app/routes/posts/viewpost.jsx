import { getPost } from "../../api/posts";

export async function clientLoader({ params }) {
  const response = await getPost(params.postId);
  console.log(response);
  return response.data;
}

export default function ViewPost({ loaderData }) {
  return (
    <div>
      <h1>{loaderData.content}</h1>
    </div>
  );
}
