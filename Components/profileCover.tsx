import { User} from "@prisma/client"
interface ProfileCoverProps {
  user: User;
}

function profileCover({ user }: ProfileCoverProps) {
  return (
    <div>
      <main className="w-full h-[40vh] px-10 shadow-lg shadow-primary rounded-md">
        <div className=" w-full h-full grid grid-rows-[75%_25%]">
          <div className="w-full flex  items-end justify-end relative">
            <img
              src="https://t3.ftcdn.net/jpg/06/62/78/56/360_F_662785635_zHeHRHhBHoiUJJEc0CG2ceVqXP3UJu2r.jpg"
              className=" w-full h-full rounded-md opacity-85"
            />
            <img
              src="https://img.freepik.com/free-photo/cute-girl-with-blond-hair-smiling-camera_23-2148308783.jpg?w=360"
              alt="pro"
              className=" w-32 h-32 rounded-full absolute -bottom-4 left-13"
            />
            <button className="absolute m-3 p-1 w-36 h-10 border-none text-primary bg-white hover:scale-103 shadow-sm shadow-primary rounded-md transition duration-200">
              Edit Cover Photo
            </button>
          </div>

          <div className="bg-white w-full pl-36 text-primary flex justify-between">
            <span>
              <h1 className="text-lg font-bold">{user.firstName} {user.lastName}</h1>
              <h2 className="text-md">role</h2>
            </span>
            <span>
              <button className="p-1 w-32 h-8 border border-primary hover:bg-primary shadow-sm shadow-primary mr-5 mt-3 transition duration-200 hover:scale-103 rounded-lg">
                Edit Profile
              </button>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default profileCover