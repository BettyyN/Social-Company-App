import PopUp from "@/Components/Post/CreatePost";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";

export default async function page() {
    const session = await getServerSession(authOptions);
      if (!session?.user?.userId) return <div>You must be logged in</div>
    
      const user = await db.user.findUnique({
        where: { userId: parseInt(session.user.userId) },
      });
    
      if (!user) return <div>User not found</div>;
  return (
    <div>
      <PopUp userId={user.userId} />
    </div>
  );
}
