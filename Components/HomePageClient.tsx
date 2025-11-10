"use client";

import DrawerComponent from "@/Components/drawer";
import HomeHeader from "@/Components/homeheader";
import ChatDrawer from "@/Components/chatDrawer";
import PostList from "@/Components/Post/postList";
import GroupsPage from "@/Components/group/GroupsPage";
import CreatePost from "@/Components/Post/CreatePost"; // Assuming this path is correct
// Assuming a component for creating groups exists. If not, this import will need adjustment.
import CreateGroupForm from "@/Components/group/CreateGroupForm"; // Placeholder, might need adjustment
import { useAppSelector, useAppDispatch } from "@/redux/hooks"; // Import useAppDispatch
import { setActiveSection } from "@/redux/slices/uiSlice"; // Import setActiveSection action

// Define the expected type for activeSection
type ActiveSectionType =
  | "general"
  | "posts"
  | "groups"
  | "create-post"
  | "create-group"
  | null;

export default function HomePageClient({
  userName,
  userId,
}: {
  userName: string;
  userId: number;
}) {
  const dispatch = useAppDispatch(); // Initialize dispatch
  // Explicitly type activeSection to ensure it includes "create-post"
  const activeSection: ActiveSectionType = useAppSelector(
    (state) => state.ui.activeSection
  );
  const isDrawerOpen = useAppSelector((state) => state.ui.isDrawerOpen);

  const drawerWidthClass = isDrawerOpen ? "w-1/5 min-w-[200px]" : "w-16";
  const gridTemplateColumns = isDrawerOpen
    ? "grid-cols-[15%_65%_20%]"
    : "grid-cols-[64px_auto_20%]";

  // Function to render the correct middle content based on activeSection
  const renderMiddleContent = () => {
    switch (activeSection) {
      case "posts": // For general post list view
        return <PostList />;
      case "groups": // For group list/view
        return <GroupsPage />;
      case "create-post": // For the create post form
        return <CreatePost userId={userId} />; // Pass userId to CreatePost
      case "create-group": // For the create group form
        return <CreateGroupForm />; // Use the assumed component
      default:
        return <PostList />; // Default to post list if section is unknown
    }
  };

  return (
    <div
      className={`flex h-screen bg-[#FDFDFD] overflow-hidden ${gridTemplateColumns}`}
    >
      {/* Left Drawer */}
      <div
        className={`${drawerWidthClass} border-r border-gray-200 transition-all duration-300`}
      >
        <DrawerComponent />
      </div>

      {/* Middle Content */}
      <div className="flex-1 overflow-y-auto p-4 transition-all duration-300">
        <div className="mb-6">
          <HomeHeader userName={userName} />
        </div>

        <div>{renderMiddleContent()}</div>
      </div>

      {/* Right Chat Drawer */}
      <div className="w-1/4 min-w-[250px] border-l border-gray-200 bg-white shadow-lg">
        <ChatDrawer />
      </div>
    </div>
  );
}
