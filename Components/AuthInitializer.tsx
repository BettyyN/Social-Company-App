// components/AuthInitializer.tsx
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { clearUser, setUserRole } from "@/redux/slices/authSlice";

export function AuthInitializer() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.roleId) {
      dispatch(setUserRole(Number(session.user.roleId)));
    } else if (status === "unauthenticated") {
      dispatch(clearUser());
    }
  }, [status, session, dispatch]);

  return null;
}
