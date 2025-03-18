// "use client";

import { getServerSession } from "next-auth";
import Drawer from "../../Components/drawer";
import PostCard from "../../Components/postCard";
import { authOptions } from "@/lib/auth";

export default async function page() {
  const session =await getServerSession(authOptions);
  console.log(session);
  if (session?.user){
    return (
        <div className="flex flex-row">
          <div>
            <Drawer />
          </div>
          <div>
            <PostCard />
            <h2>Welcome back {session?.user.phoneNumber}</h2>
          </div>
        </div>
    );
  }
  return (
    <>
      <div className="flex flex-row">
        <h1> please logion.</h1>        </div>
    </>
  );
}
