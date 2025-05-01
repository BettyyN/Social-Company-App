"use client";

import { useState } from "react";
import { FiMessageSquare, FiUsers, FiSettings, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

export default function drawer() {
      const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div
        className={`h-screen bg-[#F5F7FA] ${
          isOpen ? "w-64" : "w-16 bg-transparent shadow-2xl shadow-primary"
        } transition-all duration-300 flex flex-col relative`}
      >
        {/* Toggle Button */}
        <button
          className="text-primary p-5 self-end focus:outline-none flex "
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        {/* Navigation */}
        {isOpen && (
          <div className="flex flex-col flex-grow mt-8 space-y-2 text-sm text-black">
            <ul className="flex flex-col w-full ">
              <li className="flex w-full p-7 hover:bg-secondary rounded-4xl rounded-r-none rounded-e-xl transition-colors cursor-pointer h-10  gap-2 items-center hover:bg-[#FDFDFD]">
                <FiMessageSquare size={24} className=" pt-1" />
                <h1 className=" text-lg ">General</h1>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

