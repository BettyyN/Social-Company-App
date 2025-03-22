import { useState } from "react";


const Profile = () => {
      const [showPopup, setShowPopup] = useState(true);
  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm z-50">
      {/* Popup Container */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1100px] z-100 bg-secondary shadow-indigo-300 h-[500px] overflow-x-hidden rounded-xl bg-black">
        
        {/* Close Button */}
        <div>
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-2 right-2 text-primary hover:scale-105 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Content */}
        <div className="relative w-full bg-amber-200 h-full px-12 z-40">
          <h1 className="text-3xl font-bold text-primary ">Welcome</h1>
        </div>
      </div>
    </div>
  );
}

export default Profile
