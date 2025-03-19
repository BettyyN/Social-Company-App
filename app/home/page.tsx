// "use client";

import { getServerSession } from "next-auth";
import Drawer from "../../Components/drawer";
import PostCard from "../../Components/postCard";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import HomeHeader from "@/Components/homeheader";
import User from "@/Components/user";

export default async function page() {
  const session =await getServerSession(authOptions);
  console.log(session);
  if (session?.user){
    return (
      <>
        <div className="flex flex-row h-screen">
          <div className="flex">
            <Drawer />
          </div>
          <div className="flex-1 overflow-y-auto transition-margin duration-300">
            <HomeHeader />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <h2>Welcome back {session?.user.firstName}</h2>

            <h2> client</h2>
            <User/>
            <h2>Server</h2>
            {JSON.stringify(session)}
          </div>
        </div>
      </>
    );
  }
  return redirect("/auth/login");
}
