import ProfileCover from "@/Components/profileCover";
import ProfileAbout from "@/Components/profileAbout";
import ProfilePost from "@/Components/profilePost";

function page() {
  return (
    <>
      <ProfileCover />
      <div className="flex gap-3 m-3">
        <div className="ml-24">
          <ProfileAbout />
        </div>
        <div className="pl-5 py-3 pr-24">
          <ProfilePost />
        </div>
      </div>
    </>
  );
}

export default page