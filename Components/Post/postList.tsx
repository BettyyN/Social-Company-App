"use client";

import { useEffect, useState } from "react";;
import axios from "axios";
import PostCard from "../postCard";

type Post = {
  postId: number;
  title: string;
  description: string;
  picture: string | null;
  createdAt: string;
  authorId: number;
  userPosts: {
    user: {
      firstName: string;
      lastName: string;
    };
  }[];
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/post");
        setPosts(res.data);
      } catch (err) {
        console.error("❌ Failed to load posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <PostCard
          key={post.postId}
          title={post.title}
          description={post.description}
          picture={post.picture}
          createdAt={post.createdAt}
          authorName={
            post.userPosts[0]
              ? `${post.userPosts[0].user.firstName} ${post.userPosts[0].user.lastName}`
              : "unknown"
          }
        />
      ))}
    </div>
  );
}
