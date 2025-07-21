"use client";

type PostCardProps = {
  title: string;
  description: string;
  picture?: string | null;
  createdAt: string;
  authorName: string;
};

export default function PostCard({
  title,
  description,
  picture,
  createdAt,
  authorName,
}: PostCardProps) {
  return (
    <div className="flex flex-col shadow-sm shadow-[#F8F8FA] h-80">
      <div className="w-full rounded-full pt-5 pl-5 ">
        <span className="flex gap-1">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="rounded-full w-14 h-14"
            alt="User"
          />
          <span className="flex flex-col text-sm pt-2">
            <h2>{authorName}</h2>
          </span>
          <h3 className="pl-2">{new Date(createdAt).toLocaleDateString()}</h3>
        </span>
      </div>
      <div className="flex md:flex-row flex-col px-10">
        {picture && (
          <div className="p-5 md:w-1/3 w-full">
            <figure>
              <img src={picture} alt="Post" className="h-48 w-full" />
            </figure>
          </div>
        )}
        <div className="px-3 pt-4 md:w-2/3 w-full">
          <h2 className="font-semibold">{title}</h2>
          <p className="line-clamp-3">{description}</p>
          <div className="mt-2 flex justify-end">
            <button className="bg-primary text-white px-3 py-1 rounded">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
