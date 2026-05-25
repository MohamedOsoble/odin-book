import { getPost } from "../../api/posts";
import Post from "../../components/Post";
import { PostComment } from "../../components/Comment";

export async function clientLoader({ params }) {
  const response = await getPost(params.postId);
  return response.data;
}

export function CommentSection({ comments }) {
  console.log(comments);
  return (
    <div>
      {comments.map((comment) => {
        return <PostComment comment={comment} />;
      })}
    </div>
  );
}

export default function ViewPost({ loaderData }) {
  const author = {
    id: loaderData.author.id,
    username: loaderData.author.username,
    avatar: loaderData.author.profile.avatar,
  };

  return (
    <div>
      <Post author={author} post={loaderData} />
      <CommentSection comments={loaderData.comments} />
    </div>
  );
}
