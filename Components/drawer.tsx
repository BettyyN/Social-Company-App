"use client";
import { useEffect } from "react";
import { Home, PlusSquare, Users, List, Menu, X } from "lucide-react"; // Updated lucide-react icons
import Link from "next/link";
import { useSession } from "next-auth/react";
import { setActiveSection, toggleDrawer } from "@/redux/slices/uiSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";

export default function DrawerComponent() { // Renamed to avoid conflict with HTML tag
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const isDrawerOpen = useAppSelector((state) => state.ui.isDrawerOpen);
  const activeSection = useAppSelector((state) => state.ui.activeSection); // Move this hook call up

  // Show loading until session is available
  if (status === "loading") {
    return <div className="p-4">Loading...</div>;
  }

  const isAdmin = Number(session?.user?.roleId) === 3;

  const getNavItemClasses = (section: string) => {
    const isActive = activeSection === section;
    return `flex items-center w-full px-6 py-3 rounded-e-2xl transition-colors cursor-pointer gap-4 h-14
            ${isActive ? "bg-primary text-white" : "hover:bg-purple-100 hover:text-primary text-gray-700"}`;
  };

  const getIconColorClass = (section: string) => {
    const isActive = activeSection === section;
    return isActive ? "text-white" : "text-gray-700 group-hover:text-primary";
  };

  return (
    <>
      <div
        className={`h-screen bg-slate-50 ${
          isDrawerOpen ? "w-full" : "w-16 bg-transparent shadow-2xl shadow-primary"
        } transition-all duration-300 flex flex-col relative`}
      >
        <button
          className="text-primary p-5 self-end focus:outline-none flex "
          onClick={() => dispatch(toggleDrawer())}
        >
          {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {/* Navigation */}
        {isDrawerOpen && (
          <div className="flex flex-col flex-grow mt-8 space-y-2 text-sm p-2 text-[#4D4D4D]">
            <ul className="flex flex-col w-full">
              <li className={getNavItemClasses("general")}
                  onClick={() => dispatch(setActiveSection("general"))}>
                <Home size={24} className={getIconColorClass("general")} />
                <span className="text-base font-semibold">
                  General
                </span>
              </li>
              <Link href="/post">
                <li className={getNavItemClasses("posts")}
                    onClick={() => dispatch(setActiveSection("posts"))}>
                  <PlusSquare size={24} className={getIconColorClass("posts")} />
                  <span className="text-base font-semibold">
                    Post
                  </span>
                </li>
              </Link>
              {isAdmin && (
                <>
                  <Link href="/group">
                    <li className={getNavItemClasses("create-group")}
                        onClick={() => dispatch(setActiveSection("create-group"))}>
                      <Users size={24} className={getIconColorClass("create-group")} />
                      <span className="text-base font-semibold">
                        Create group
                      </span>
                    </li>
                  </Link>
                  <li className={getNavItemClasses("groups")}
                      onClick={() => dispatch(setActiveSection("groups"))}>
                    <List size={24} className={getIconColorClass("groups")} />
                    <span className="text-base font-semibold">
                      Groups
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
