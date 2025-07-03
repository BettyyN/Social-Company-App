import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProfileCover from "@/Components/profileCover";
import ProfileAbout from "@/Components/profileAbout";
import ProfilePost from "@/Components/profilePost";
import { db } from "@/lib/db";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.userId) return <div>You must be logged in</div>

  const user = await db.user.findUnique({
    where: { userId: parseInt(session.user.userId) },
  });

  if (!user) return <div>User not found</div>;

  return (
    <>
      <ProfileCover user={user} />
      <div className="flex gap-3 m-3">
        <div className="ml-24">
          <ProfileAbout user={user} />
        </div>
        <div className="pl-5 py-3 pr-24">
          <ProfilePost userId={user.userId}/>
        </div>
      </div>
    </>
  );
}
