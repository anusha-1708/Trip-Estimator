import User from "../models/user.schema.js";

export const getUsers = async () => {
  const users = await User.find().select("-password");
  if (!users) {
    throw new Error("No users found");
  }
  return users;
};
