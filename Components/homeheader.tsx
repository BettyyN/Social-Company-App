"use client"
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Bell, MessageCircle } from "lucide-react";
import { signOut } from "next-auth/react";

export default function HomeHeader() {

  return (
    <>
      <header className="shadow-sm bg-[#F4F0FF] text-primary opacity-80 sticky top-0 z-50">
        <nav className="container mx-auto flex items-center  p-2 justify-center">
          {/* Desktop Menu */}
          <div className="flex flex-row space-x-10 text-primary">
            <div className="pt-2 text-primary">
              <MessageCircle size={28} />
            </div>
            <div className="pt-2">
              <Bell size={28} />
            </div>
            <div className="w-12 rounded-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                className="rounded-full"
              />
            </div>
            <div>
                <button className="pt-3 underline" onClick={()=> signOut({
                    redirect:true,
                    callbackUrl:`${window.location.origin}/auth/login`,
                })}>Log out</button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
