function upcomingEvents() {
  return (
    <div className="w-full shadow-gray-600 shadow-lg relative p-2">
      <div className="flex justify-between p-2 text-md font-bold">
        <h1>Upcoming Events</h1>
        <button className="text-purple-600">See All</button>
      </div>
      <div className="bg-slate-100  p-2 mx-4 my-2 rounded-sm flex flex-col ">
        <span className="flex">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="rounded-full w-9 h-9"
          />
          <span className="flex flex-col text-xs pl-2">
            <h2>Name</h2>
            <h3>13 Oct, 13:00 Lt</h3>
          </span>
        </span>
        <p className="p-1 border-b border-[#4D4D4D] w-full text-justify">
          dsgs fgtr sffvsf gser gsfs fgsfg sfsh
          vsf gse rgs fsfgs fgs fsh gj fy jnd dd dr s sj
        </p>
        <div className="flex py-4 px-2">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="rounded-full w-6 h-6 -m-1.5"
          />
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="rounded-full w-6 h-6 -m-1.5"
          />
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="rounded-full w-6 h-6 -m-1.5"
          />
          <h1 className="right-8 -my-2 absolute">112 reacted</h1>
        </div>
      </div>
      
    </div>
  );
}

export default upcomingEvents;
