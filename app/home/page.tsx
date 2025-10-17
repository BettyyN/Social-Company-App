// app/page.tsx or app/(dashboard)/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import HomePageClient from "@/Components/HomePageClient";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/auth/login");
  }

  const userName = `${session.user.firstName ?? ""}`;

  // ✅ pass session data as props
  return <HomePageClient userName={userName} />;
}
