import React, { useState, useEffect } from "react";
import { IoMdClose, IoMdSearch, IoMdCheckmark } from "react-icons/io";
import { HiUsers } from "react-icons/hi";
import { createSharedTrip } from "../../api/shareTrip";
import { handleSuccess, handleError } from "../../utils/common";
import { fetchUsers } from "../../api/user";

const ShareTripModal = ({ open, onClose, tripId }) => {
  // Mock Data - Replace this with an actual API call to fetch your users
  const [availableUsers] = useState([
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Sarah Smith", email: "sarah@design.com" },
    { id: "3", name: "Mike Ross", email: "mike.r@law.com" },
    { id: "4", name: "Harvey Specter", email: "harvey@pearson.com" },
    { id: "5", name: "Rachel Zane", email: "rachel@legal.com" },
  ]);
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (!open) return;

    const fetchUser = async () => {
      try {
        const res = await fetchUsers();
        setMembers(res?.data || []);
      } catch (err) {
        handleError("Failed to fetch users");
      }
    };

    fetchUser();
  }, [open]);

  if (!open) return null;

  const toggleUser = (userId) => {
    setSelectedIds((prev) =>
      prev.includes(userId)
        ? prev.filter((_id) => _id !== userId)
        : [...prev, userId],
    );
  };

  const filteredUsers = members.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleShare = async () => {
    try {
      const data = { tripId, userIds: selectedIds };
      const response = await createSharedTrip(data);
      if (response.success) {
        handleSuccess(`Shared with ${selectedIds.length} members`);
        onClose();
        setSelectedIds([]);
      }
    } catch (error) {
      handleError(error.message || "Failed to share");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Add Members</h2>
            <p className="text-xs text-slate-500">
              Sharing
              {/* <span className="text-blue-600 font-semibold">{tripName}</span> */}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4">
          <div className="relative">
            <IoMdSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Selected Users Tray */}
        {selectedIds.length > 0 && (
          <div className="px-6 py-2 flex gap-2 overflow-x-auto pb-4 border-b border-slate-50">
            {selectedIds.map((id) => {
              const user = members.find((u) => u._id === id);
              return (
                <div
                  key={id}
                  className="flex-shrink-0 flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-100"
                >
                  {user?.fullName}
                  <IoMdClose
                    className="cursor-pointer"
                    onClick={() => toggleUser(id)}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* User List Container */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 min-h-[300px]">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const isSelected = selectedIds.includes(user._id);
              return (
                <div
                  key={user._id}
                  onClick={() => toggleUser(user._id)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected ? "bg-blue-50/50" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 uppercase">
                      {user?.fullName?.charAt(0)}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold ${isSelected ? "text-blue-700" : "text-slate-700"}`}
                      >
                        {user?.fullName}
                      </p>
                      <p className="text-[11px] text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-blue-600 border-blue-600"
                        : "border-slate-200"
                    }`}
                  >
                    {isSelected && (
                      <IoMdCheckmark className="text-white" size={14} />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <HiUsers size={40} className="opacity-20 mb-2" />
              <p className="text-sm italic">No users found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <button
            onClick={handleShare}
            disabled={selectedIds.length === 0}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2
              ${
                selectedIds.length === 0
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
              }`}
          >
            {selectedIds.length > 0
              ? `Share with ${selectedIds.length} Members`
              : "Select Members"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareTripModal;
