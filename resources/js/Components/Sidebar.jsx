import { FaHome, FaShoppingCart, FaUsers, FaBell } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";

export default function Sidebar({ isOpen }) {
  return (
    <div
      className={`bg-white shadow-lg p-6 w-64 h-screen rounded-md transition-all duration-300 ${
        isOpen ? "block" : "hidden"
      } md:block`}
    >
      <Typography variant="h5" className="text-center font-bold mb-6">
        Dashboard
      </Typography>
      <ul className="space-y-4">
        <li className="flex items-center gap-3 p-3 rounded-md bg-black text-white cursor-pointer">
          <FaHome /> Dashboard
        </li>
        <li className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 cursor-pointer">
          <FaUsers /> Profile
        </li>
        <li className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 cursor-pointer">
          <FaShoppingCart /> Tables
        </li>
        <li className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 cursor-pointer">
          <FaBell /> Notifications
        </li>
      </ul>
    </div>
  );
}