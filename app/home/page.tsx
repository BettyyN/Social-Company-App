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
        <div className="flex flex-row h-screen bg-[#FDFDFD] overflow-hidden">
          <div className="flex">
            <Drawer />
          </div>
          <div className="flex-1 overflow-y-auto transition-margin duration-300 ">
            <div className="md:mx-5">
              <HomeHeader userName={userName} />
            </div>
            <div className="md:mx-15">
              <PostCard />
            </div>
          </div>
        </div>
      </>
    );
  }
  return redirect("/auth/login");
}
