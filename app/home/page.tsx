// "use client";

import { getServerSession } from "next-auth";
import Drawer from "../../Components/drawer";
import PostCard from "../../Components/postCard";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import HomeHeader from "@/Components/homeheader";
import User from "@/Components/user";
import ChatDrawer from "@/Components/chatDrawer";


export default async function page() {
  const session =await getServerSession(authOptions);
  console.log(session);
  if (session?.user){
    // const userName=(session?.user.firstName+" "+session?.user.lastName).toString();
    const userName=(session?.user.firstName+" ").toString();
    return (
      <>
        <div className=" flex-row h-screen bg-[#FDFDFD] overflow-hidden grid grid-cols-[15%_67%_18%] ">
          <div className="flex ">
            <Drawer />
          </div>
          <div className="flex-1 overflow-y-auto transition-margin duration-300 ">
            <div className="md:mx-5 ">
              <HomeHeader userName={userName} />
            </div>
            <div className="md:mx-15 ">
              <PostCard />
            </div>
          </div>
          <div className="flex-1 shadow-purple-100 shadow-lg bg-slate-50">
            <ChatDrawer />
          </div>
        </div>
      </>
    );
  }
  return redirect("/auth/login");
}
