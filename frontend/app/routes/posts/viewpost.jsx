import { getPost } from "../../api/posts";
import Post from "../../components/Post";

export async function clientLoader({ params }) {
  const response = await getPost(params.postId);
  return response.data;
}

export default function ViewPost({ loaderData }) {
  return (
    <div>
      <Post author={loaderData.author} post={loaderData} />
    </div>
  );
}
