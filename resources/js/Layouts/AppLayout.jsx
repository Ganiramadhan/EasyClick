import { useState } from "react";
import { Typography, Button, Card } from "@material-tailwind/react";
import { FiMenu, FiBell, FiMail } from "react-icons/fi";
import { FaBox, FaMoneyBillWave, FaUsers, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";

export default function AppLayout({ header, children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg p-6 w-72 h-screen transition-all duration-300 rounded-xl m-4 border border-gray-200 ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-gray-800">Fun'Technology</span>
          <Button variant="text" onClick={toggleSidebar} className="md:hidden">
            <FiMenu size={24} className="text-gray-700" />
          </Button>
        </div>

        <ul className="space-y-2">
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-gray-700">
            <FaTachometerAlt /> Dashboard
          </li>
          <li className="flex items-center gap-3 p-3 rounded-lg bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-all">
            <FaBox /> Product
          </li>
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-gray-700">
            <FaMoneyBillWave /> Transaction
          </li>
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-gray-700">
            <FaUsers /> User
          </li>
        </ul>
        <div className="mt-6 border-t pt-4">
          <ul className="space-y-2">
            <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-gray-700">
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-6 border border-gray-200">
          <div className="font-medium flex items-center gap-3 text-gray-800">
            <FaBox size={24} />
            <span className="text-lg font-semibold">{header || "Dashboard"}</span>
          </div>
          <div className="flex items-center space-x-4">
            <FiMail className="cursor-pointer text-gray-600 hover:text-blue-500 transition-all" size={20} />
            <FiBell className="cursor-pointer text-gray-600 hover:text-blue-500 transition-all" size={20} />
          </div>
        </div>

        {/* Dashboard Content */}
        <Card className="p-6 shadow-md rounded-lg bg-white border border-gray-200">
          {children}
        </Card>
      </div>
    </div>
  );
}
