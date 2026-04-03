import {
  signupUserService,
  loginUserService,
} from "../services/auth.service.js";

export const signupUserController = async (req, res) => {
  try {
    const newUser = await signupUserService(req.body, req.file);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const result = await loginUserService(req.body);
    const { user, token } = result;
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
