"use client"
import Link from "next/link";
import { Bell, MessageCircle } from "lucide-react";
import {signOut } from "next-auth/react";

export default function HomeHeader({ userName }: { userName: string }) 
{
  return (
    <>
      <header className="shadow-sm bg-[#F4F0FF] text-primary opacity-80 sticky top-0 z-50  rounded-2xl flex">
        <div className="text-sm w-1/3 md:w-1/4 p-5 md:text-lg">
          <span className="flex">Selam, {userName}</span>
        </div>
        <div className="container flex items-center justify-end px-3  py-2">
          {/* Desktop Menu */}
          <div className="flex flex-row md:space-x-5 text-primary space-x-3">
            <div className="pt-2">
              <MessageCircle className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <div className="pt-2">
              <Bell className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <div className="w-12 rounded-full">
              <Link href={"/profile"}>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  className="rounded-full"
                />
              </Link>
            </div>
            <div className="text-">
              <button
                className="pt-3 underline"
                onClick={() =>
                  signOut({
                    redirect: true,
                    callbackUrl: `${window.location.origin}/auth/login`,
                  })
                }
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
