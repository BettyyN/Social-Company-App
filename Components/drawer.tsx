"use client";
import { useEffect, useState } from "react";
import { FiMessageSquare,FiEdit, FiSettings, FiMenu, FiX, FiPhone } from "react-icons/fi";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { setActiveSection } from "@/redux/slices/uiSlice";
import { useDispatch } from "react-redux";

export default function drawer() {
      const [isOpen, setIsOpen] = useState(true);
      const { data: session, status } = useSession();
      const dispatch = useDispatch();

      // Show loading until session is available
      if (status === "loading") {
        return <div className="p-4">Loading...</div>;
      }

      const isAdmin = Number(session?.user?.roleId) === 3;
  return (
    <>
      <div
        className={`h-screen bg-slate-50 ${
          isOpen ? "w-full" : "w-16 bg-transparent shadow-2xl shadow-primary"
        } transition-all duration-300 flex flex-col relative`}
      >
        <button
          className="text-primary p-5 self-end focus:outline-none flex "
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        {/* Navigation */}
        {isOpen && (
          <div className="flex flex-col flex-grow mt-8 space-y-2 text-sm p-2 text-[#4D4D4D]">
            <ul className="flex flex-col w-full">
              <li className="flex items-center w-full px-6 py-3 hover:bg-secondary rounded-e-2xl transition-colors cursor-pointer gap-4 h-14">
                <FiMessageSquare size={24} className="text-gray-700" />
                <span className="text-base font-semibold text-gray-900">
                  General
                </span>
              </li>
              <Link href="/post">
                <li className="flex items-center w-full px-6 py-3 hover:bg-secondary rounded-e-2xl transition-colors cursor-pointer gap-4 h-14">
                  <FiEdit size={24} className="text-gray-700" />
                  <span className="text-base font-semibold text-gray-900">
                    Post
                  </span>
                </li>
              </Link>
              {isAdmin && (
                <>
                  <Link href="/group">
                    <li className="flex items-center w-full px-6 py-3 hover:bg-secondary rounded-e-2xl transition-colors cursor-pointer gap-4 h-14">
                      <FiEdit size={24} className="text-gray-700" />
                      <span className="text-base font-semibold text-gray-900">
                        Create group
                      </span>
                    </li>
                  </Link>
                    <li className="flex items-center w-full px-6 py-3 hover:bg-secondary rounded-e-2xl transition-colors cursor-pointer gap-4 h-14"
                    onClick={() => dispatch(setActiveSection("groups"))}>
                      <FiEdit size={24} className="text-gray-700" />
                      <span className="text-base font-semibold text-gray-900">
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

