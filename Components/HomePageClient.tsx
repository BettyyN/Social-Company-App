"use client";

import DrawerComponent from "@/Components/drawer"; // Use the renamed component
import HomeHeader from "@/Components/homeheader";
import ChatDrawer from "@/Components/chatDrawer";
import PostList from "@/Components/Post/postList";
import GroupsPage from "@/Components/group/GroupsPage";
import { useAppSelector } from "@/redux/hooks";

export default function HomePageClient({ userName }: { userName: string }) {
  const activeSection = useAppSelector((state) => state.ui.activeSection);
  const isDrawerOpen = useAppSelector((state) => state.ui.isDrawerOpen);

  const drawerWidthClass = isDrawerOpen ? "w-1/5 min-w-[200px]" : "w-16";
  const gridTemplateColumns = isDrawerOpen ? "grid-cols-[15%_65%_20%]" : "grid-cols-[64px_auto_20%]"; // Adjust grid for closed drawer

  return (
    <div className={`flex h-screen bg-[#FDFDFD] overflow-hidden ${gridTemplateColumns}`}>
      {/* Left Drawer */}
      <div className={`${drawerWidthClass} border-r border-gray-200 transition-all duration-300`}>
        <DrawerComponent />
      </div>

      {/* Middle Content */}
      <div className="flex-1 overflow-y-auto p-4 transition-all duration-300">
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
