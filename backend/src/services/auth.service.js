import Auth from "../models/user.schema.js";
import { comparePassword, passwordHashing } from "../utils/hashing.js";
import { generateToken } from "../utils/token.js";

export const signupUserService = async (userData, file) => {
  const { fullName, email, password } = userData;
  const profileImage = file ? file.filename : null;

  const existingUser = await Auth.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await passwordHashing(password);
  const newUser = await Auth.create({
    ...userData,
    password: hashedPassword,
    profileImage: profileImage,
  });
  return newUser;
};

export const loginUserService = async (userData) => {
  const { email, password } = userData;
  const user = await Auth.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  const token = await generateToken({ id: user._id, email: user.email });
  user.password = undefined;
  return { user, token };
};
