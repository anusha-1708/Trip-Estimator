import User from "../models/user.schema.js";

export const getUsers = async (currentUserId) => {
  const users = await User.find({
    _id: { $ne: currentUserId },
  }).select("-password");
  if (!users) {
    throw new Error("No users found");
  }
  return users;
};
