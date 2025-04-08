

function profileCover() {
  return (
    <div>
      <main className="w-full h-[40vh] px-10 shadow-lg shadow-primary rounded-md">
        <div className=" w-full h-full grid grid-rows-[75%_25%]">
          <div className="w-full flex  items-end justify-end relative">
            <img
              src="https://t3.ftcdn.net/jpg/06/62/78/56/360_F_662785635_zHeHRHhBHoiUJJEc0CG2ceVqXP3UJu2r.jpg"
              className=" w-full h-full rounded-md"
            />
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/026/829/465/small_2x/beautiful-girl-with-autumn-leaves-photo.jpg"
              alt="pro"
              className=" w-20 h-20 rounded-full absolute -bottom-4 left-6"
            />
            <button className="absolute p-5">Edit Cover Photo</button>
          </div>

          <div className="bg-white w-full pl-24 text-primary flex justify-between">
            <span>
              <h1 className="text-xl font-bold"> Full name</h1>
              <h2 className="text-md">Member</h2>
            </span>
            <span>
              <button> Edit Profile</button>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default profileCover