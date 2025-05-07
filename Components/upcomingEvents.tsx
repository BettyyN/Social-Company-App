function upcomingEvents() {
  return (
    <div className="w-full shadow-gray-600 shadow-lg relative">
      <div className="shadow-md shadow-gray-500 flex justify-between p-3 text-md">
        <h1>Upcoming Events</h1>
        <button>See All</button>
      </div>
      <div className="bg-gray-400 m-3 p-3 rounded-sm flex flex-col">
        <span className="flex">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="rounded-full w-8 h-8"
          />
          <span className="flex flex-col text-sm">
            <h2>Name</h2>
            <h3>13 Oct, 13:00 Lt</h3>
          </span>
        </span>
        <p className="p-1 border-b border-[#4D4D4D] w-full">
          dsgs fgtr sffvsf gser gsfs fgsfg sfsh jfyjn dddd rssj dsg sfg trsff
          vsf gse rgs fsfgs fgs fsh gj fy jnd dd dr s sj
        </p>
        <div className="flex p-2">
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
          <h1 className="right-2">112 reacted</h1>
        </div>
      </div>
    </div>
  );
}

export default upcomingEvents;
