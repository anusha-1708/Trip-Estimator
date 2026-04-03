import { useState } from "react";
import logo from "../assets/logo.png";
import { IoSearchSharp } from "react-icons/io5";
import { FiBell } from "react-icons/fi";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white border-b border-[#1f2937]/10">
      <div className="flex-col items-center gap-3">
        <p>Good Morning!</p>
        <span className="text-base font-bold">Welcome Back to Travelly</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1f2937]/60" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-72 h-10 pl-10 pr-4 rounded-full border border-[#1f2937]/20 bg-white text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#1f2937]/30"
          />
        </div>
        <button
          className="h-10 w-10 rounded-full border border-[#1f2937]/15 text-[#1f2937] grid place-items-center hover:bg-[#1f2937]/10 transition"
          aria-label="Notifications"
        >
          <FiBell className="text-lg" />
        </button>
        <img
          src={logo}
          alt="User profile"
          className="h-10 w-10 rounded-full border border-[#1f2937]/15 object-cover"
        />
      </div>
    </nav>
  );
};

export default Navbar;
