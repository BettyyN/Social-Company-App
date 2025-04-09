import { FaUser, FaPhone, FaBriefcase, FaBirthdayCake, FaUserShield } from "react-icons/fa";


export default function profileAbout() {
  return (
    <>
      <div className="w-64 h-[30rem] shadow-md shadow-purple-400 p-5 text-primary flex flex-col">
        <h1 className="text-lg font-bold">About</h1>
        <ul className="text-md space-y-3 pb-3">
          <li className="border-b p-3 flex items-center gap-3">
            {" "}
            <FaUser className="mr-2" /> Full Name
          </li>
          <li className=" border-b p-3 flex items-center gap-3">
            {" "}
            <FaPhone className="mr-2" /> Phone Number
          </li>
          <li className=" border-b p-3 flex items-center gap-3">
            <FaUser className="mr-2" /> Baptismal Name
          </li>
          <li className=" border-b p-3 flex items-center gap-3">
            <FaBriefcase className="mr-2" /> Job
          </li>
          <li className=" border-b p-3 flex items-center gap-3">
            {" "}
            <FaBirthdayCake className="mr-2" /> Birthday
          </li>
          <li className=" border-b p-3 flex items-center gap-3">
            <FaUserShield className="mr-2" /> Role
          </li>
        </ul>
        <button className="p-1 w-32 h-8 border border-primary hover:bg-primary shadow-sm shadow-primary mr-5 mt-3 transition duration-200 hover:scale-103 rounded-lg right-0">
          Edit Profile
        </button>
      </div>
    </>
  );
}
