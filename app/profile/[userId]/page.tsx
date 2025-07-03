import { db } from "@/lib/db"; // replace with your db client
import ProfileCover from "@/Components/profileCover";
import ProfileAbout from "@/Components/profileAbout";
import ProfilePost from "@/Components/profilePost";
import { notFound } from "next/navigation";
import { User } from "@prisma/client"; 

type Props = {
  params: {
    userId: string;
  };
};

export default async function OtherUserProfile({ params }: Props) {
  const user:User | null = await db.user.findUnique({
    where: { userId:parseInt( params.userId )},
  });

  if (!user) return notFound();

  return (
    <>
      <ProfileCover user={user}/>
      <div className="flex gap-3 m-3">
        <div className="ml-24">
          <ProfileAbout user={user}/>
        </div>
        <div className="pl-5 py-3 pr-24">
          <ProfilePost userId={user.userId}/>
        </div>
      </div>
    </>
  );
}
