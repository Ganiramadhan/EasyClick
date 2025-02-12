import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import { Button, Card } from "@material-tailwind/react";
import { FiMenu, FiBell, FiMail } from "react-icons/fi";
import { FaBox, FaMoneyBillWave, FaUsers, FaSignOutAlt, FaTachometerAlt, FaUser } from "react-icons/fa";

export default function AppLayout({ header, children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { url, props } = usePage();
  const user = props.auth.user;
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const navigate = (path) => {
    router.visit(path);
  };

  const logout = () => {
    router.post("/logout");
  };

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
          <li
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${url === "/dashboard" ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            onClick={() => navigate("/dashboard")}
          >
            <FaTachometerAlt /> Dashboard
          </li>
          <li
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${url.startsWith("/product") ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            onClick={() => navigate("/product")}
          >
            <FaBox /> Products
          </li>
          <li
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${url.startsWith("/order") ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            onClick={() => navigate("/order")}
          >
            <FaMoneyBillWave /> Orders
          </li>
          <li
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${url.startsWith("/user") ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            onClick={() => navigate("/user")}
          >
            <FaUsers /> User
          </li>
        </ul>
        <div className="mt-6 border-t pt-4">
          <ul className="space-y-2">
            <li
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${url.startsWith("/profile") ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700"}`}
              onClick={() => navigate("/profile")}
            >
              <FaUser /> Profile
            </li>
            <li 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all text-gray-700"
              onClick={logout}
            >
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
            {/* User Avatar */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/profile")}> 
            <span className="text-gray-700 font-medium">{user.name}</span>
              {user.avatar ? (
                <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full border border-gray-300" />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-white text-lg font-semibold rounded-full">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
              )}
            </div>
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
