"use client";

import Drawer from "@/Components/drawer";
import HomeHeader from "@/Components/homeheader";
import ChatDrawer from "@/Components/chatDrawer";
import PostList from "@/Components/Post/postList";
import GroupsPage from "@/Components/group/GroupsPage";
import { useAppSelector } from "@/redux/hooks";

export default function HomePageClient({ userName }: { userName: string }) {
  const activeSection = useAppSelector((state) => state.ui.activeSection);

  return (
    <div className="flex-row h-screen bg-[#FDFDFD] overflow-hidden grid grid-cols-[15%_65%_20%]">
      {/* Left Drawer */}
      <div className="flex">
        <Drawer />
      </div>

      {/* Middle Content */}
      <div className="flex-1 overflow-y-auto transition-margin duration-300">
        <div className="md:mx-5">
          <HomeHeader userName={userName} />
        </div>

        <div className="md:mx-15">
          {activeSection === "groups" ? <GroupsPage /> : <PostList />}
        </div>
      </div>

      {/* Right Chat Drawer */}
      <div className="flex-1 shadow-purple-100 shadow-lg bg-slate-50">
        <ChatDrawer />
      </div>
    </div>
  );
}
