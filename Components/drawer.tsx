"use client";

import { useState } from "react";
import { FiMessageSquare, FiUsers, FiSettings, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

export default function drawer() {
      const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div
        className={`h-screen bg-primary text-black ${
          isOpen ? "w-64" : "w-20"
        } transition-all duration-300 flex flex-col relative`}
      >
        {/* Toggle Button */}
        <button
          className="text-primary p-2 self-end focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navigation */}
        <div className="flex flex-col flex-grow mt-6 space-y-2 text-sm">
          <ul className="flex flex-col w-full pl-5">
            <li className="flex w-full p-3 hover:bg-secondary rounded transition-colors cursor-pointer h-10 bg-secondary">
              <FiMessageSquare size={24} className="text-white" />
              <h1 className="text-white">General</h1>
            </li>
            <li className="flex w-full p-3 hover:bg-secondary rounded-xl transition-colors cursor-pointer h-15 bg-white">
              <FiMessageSquare size={24} />
              <h1>Messages</h1>
            </li>
            <li className="flex w-full p-3 hover:bg-secondary rounded-xl transition-colors cursor-pointer h-15 bg-white">
              <FiMessageSquare size={24} />
              <h1>Events</h1>
            </li>
            <li className="flex w-full p-3 hover:bg-secondary rounded-xl transition-colors cursor-pointer h-15 bg-white">
              <FiMessageSquare size={24} />
              <h1>Teams</h1>
            </li>
            <li className="flex w-full p-3 hover:bg-secondary rounded-xl transition-colors cursor-pointer h-15 bg-white">
              <FiMessageSquare size={24} />
              <h1>Settings</h1>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

