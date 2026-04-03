import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { logoutUserAsync } from "../store/auth.store";
import { handleSuccess } from "../utils/common";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineSettings } from "react-icons/md";
import { TbBrandTripadvisor } from "react-icons/tb";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LuLayoutDashboard },
  { title: "Trips", path: "/trips", icon: TbBrandTripadvisor },
  { title: "Settings", path: "/settings", icon: MdOutlineSettings },
  { title: "Shared Trips", path: "/shared-trips", icon: TbBrandTripadvisor },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutUserAsync()).unwrap();
      handleSuccess(res?.message || "Logged out successfully");
      setTimeout(() => {
        navigate("/login");
      }, 300);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white text-[#1f2937] border-r border-[#1f2937]/10 shadow-sm z-40 transition-all duration-300 ${
        collapsed ? "w-20" : "w-60"
      }`}
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between px-5 py-6">
            <div
              className={`flex items-center gap-3 ${collapsed ? "mx-auto" : ""}`}
            >
              <img src={logo} alt="logo" className="h-8 w-8 object-contain" />
              {!collapsed && (
                <div>
                  <h1 className="text-[#1f2937] text-2xl font-semibold font-['Fraunces']">
                    Travelly
                  </h1>
                </div>
              )}
            </div>
            <button
              onClick={() => setCollapsed((prev) => !prev)}
              className="text-[#1f2937] text-xl p-2 rounded-lg hover:bg-[#1f2937]/10 transition"
              aria-label="Toggle Sidebar"
            >
              {collapsed ? (
                <TbLayoutSidebarRightCollapse />
              ) : (
                <TbLayoutSidebarLeftCollapse />
              )}
            </button>
          </div>

          <div className="mt-2 flex flex-col gap-2 px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-[#1f2937] hover:bg-[#1f2937]/10"
                  } ${collapsed ? "justify-center" : ""}`
                }
              >
                <item.icon className="text-lg" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mb-6 px-4">
          <button
            onClick={handleLogout}
            className={`flex items-center justify-center gap-2 w-full bg-white text-[#1f2937] hover:bg-[#1f2937]/10 border border-[#1f2937]/10 rounded-xl px-3 py-2 transition ${
              collapsed ? "px-2" : ""
            }`}
          >
            <AiOutlineLogout className="text-xl" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
