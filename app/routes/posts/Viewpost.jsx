import { getPost } from "../../api/posts";
import Post from "../../components/Post";
import { PostCommentCard, CommentSection } from "../../components/Comment";

export async function clientLoader({ params }) {
  const response = await getPost(params.postId);
  return response.data;
}

export default function ViewPost({ loaderData }) {
  const author = {
    id: loaderData.author.id,
    username: loaderData.author.username,
    avatar: loaderData.author.profile.avatar,
  };

  return (
    <div>
      <Post postList={[loaderData]} />
      <CommentSection comments={loaderData.comments} />
    </div>
  );
}
