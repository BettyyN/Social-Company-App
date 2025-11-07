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
    <div className="flex h-screen bg-[#FDFDFD] overflow-hidden">
      {/* Left Drawer */}
      <div className="w-1/5 min-w-[200px] border-r border-gray-200">
        <Drawer />
      </div>

      {/* Middle Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <HomeHeader userName={userName} />
        </div>

        <div>
          {activeSection === "groups" ? <GroupsPage /> : <PostList />}
        </div>
      </div>

      {/* Right Chat Drawer */}
      <div className="w-1/4 min-w-[250px] border-l border-gray-200 bg-white shadow-lg">
        <ChatDrawer />
      </div>
    </div>
  );
}
