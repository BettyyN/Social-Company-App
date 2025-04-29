"use client";

import { useState } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="shadow-sm  text-primary bg-white h-[60px]">
        <nav className="container mx-auto flex items-center justify-between p-2">
          {/* Logo */}
          <Link href="/" className="text-2xl font-semibold text-primary">
            MyApp
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden space-x-6 lg:flex text-[#4D4D4D]">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>

          {/* Buttons */}
          <div className="hidden space-x-4 lg:flex">
            <Link href="/auth/signup">
              <button className="bg-[#7300ff] text-white px-4 py-2 text-sm font-medium rounded shadow-md transition-transform duration-300 hover:scale-105">
                Sign Up
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="bg-[#7300ff] text-white px-4 py-2 text-sm font-medium rounded shadow-md transition-transform duration-300 hover:scale-105">
                Log In
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white "
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </nav>
      </header>
      {/* Mobile Menu */}
      {isOpen && (
        <ul className="lg:hidden flex flex-col items-start space-y-2 pl-5 p-3 text-primary w-1/3 bg-secondary absolute left-0">
          <li>
            <Link href="/" className="hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/auth/signup"
              className="block w-full text-center md:px-8 px-2  rounded bg-primary text-white hover:bg-opacity-80 hover:scale-103 text-sm"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              href="/auth/login"
              className="block w-full text-center md:px-4 px-3 py-1 md:py-2 rounded border bg-primary text-white hover:scale-103 hover:text-white"
            >
              Log In
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
