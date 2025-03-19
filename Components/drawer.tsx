"use client";

import { useState } from "react";
import { FiMessageSquare, FiUsers, FiSettings, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

export default function drawer() {
      const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div
        className={`h-screen bg-[#F4F0FF] text-white ${
          isOpen ? "w-64" : "w-20"
        } transition-all duration-300 p-4 flex flex-col relative`}
      >
        {/* Toggle Button */}
        <button
          className="text-primary p-2 self-end focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navigation */}
        <nav className="flex flex-col flex-grow mt-6 space-y-2 text-black text-sm">
          {[
            {
              label: "General",
              icon: <FiMessageSquare size={24} />,
              path: "/general",
            },
            {
              label: "Messages",
              icon: <FiMessageSquare size={24} />,
              path: "/messages",
            },

            { label: "Teams", icon: <FiUsers size={24} />, path: "/teams" },
            {
              label: "Events",
              icon: <FiSettings size={24} />,
              path: "/events",
            },
            {
              label: "Settings",
              icon: <FiSettings size={24} />,
              path: "/settings",
            },
          ].map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className="flex items-center gap-3 p-3 rounded-md transition-all"
            >
              {item.icon}
              {isOpen && <span className="text-lg">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

