"use client";

import Drawer from "../../Components/drawer";
import PostCard from "../../Components/postCard";

export default function page() {
  return (
    <>
      <div className="flex flex-row">
        <Drawer />
        <PostCard />
      </div>
    </>
  );
}
