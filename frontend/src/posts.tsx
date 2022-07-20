import { useState, useEffect } from "react";
import { axiosInstance } from "./utils/axios.js";

interface Post {
  id: number
  created_at: Date
  updated_at: Date
  title: string
  content: string
}

export const Posts = ()=> {
  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    const f = async () => {
      const res = await axiosInstance.get("/posts");
      setPosts(res.data);
    };
    f();
  }, []);

  return (
    <div className="mt-12 border border-black">
      <ul>
        {posts?.map((post: Post, index: number) => {
          return (
            <li key={index}>
              <div>{post.title}</div>
              <div>{post.content}</div>
            </li>
          )})
        }
      </ul>
    </div>
  );
}
