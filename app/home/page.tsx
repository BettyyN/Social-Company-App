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

  // Based on the type definition and previous errors, 'userId' is the correct property.
  // Ensure it's treated as a number.
  const userId = session.user.userId as number | undefined;
  const userName = `${session.user.firstName ?? ""}`;

  // If userId is undefined, we should redirect to login, as it's a required prop.
  if (userId === undefined) {
    return redirect("/auth/login");
  }

  // ✅ pass session data as props
  return <HomePageClient userName={userName} userId={userId} />;
}
