import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import UpcomingEvents from './upcomingEvents';



function chatDrawer() {
  return (
    <>
      <div className="w-full h-full pt-3">
        <div className="w-full p-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        </div>
        <div className="w-full px-4">
          <div className="w-full">
            <h2 className="font-bold justify-center items-center flex">
              Recent Chats
            </h2>
            <div className="w-full flex py-3 gap-1">
              <Link href={"/profile/1"}>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  className="rounded-full w-8 h-8"
                />
              </Link>
              <span className="pl-1"> jon </span> <span> last </span>
            </div>
            <div className="w-full flex py-3 gap-1">
              <Link href={"/profile"}>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  className="rounded-full w-8 h-8"
                />
              </Link>
              <span className="pl-1"> bin </span> <span> last </span>
            </div>
            <div className="w-full flex py-3 gap-1">
              <Link href={"/profile"}>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  className="rounded-full w-8 h-8"
                />
              </Link>
              <span className="pl-1"> bin </span> <span> last </span>
            </div>
          </div>
        </div>
        <div className='w-full p-3'>
          <UpcomingEvents />
        </div>
      </div>
    </>
  );
}

export default chatDrawer