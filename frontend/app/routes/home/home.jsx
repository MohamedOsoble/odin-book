import { allPosts } from "../../utils/placeholderPosts";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home({ loaderData }) {
  return <h1>Hello World</h1>;
}
