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
    // const userName=(session?.user.firstName+" "+session?.user.lastName).toString();
    const userName=(session?.user.firstName+" ").toString();
    return (
      <>
        <div className="flex flex-row h-screen bg-[#eff7ff]">
          <div className="flex">
            <Drawer />
          </div>
          <div className="flex-1 overflow-y-auto transition-margin duration-300">
            <HomeHeader userName={userName} />
            {/* <h2 className=" m-5 justify-center">Welcome back {session?.user.firstName}</h2> */}
            <PostCard />
          </div>
        </div>
      </>
    );
  }
  return redirect("/auth/login");
}
