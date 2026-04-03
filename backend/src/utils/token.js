import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  if (!token) {
    throw new Error("Token is required");
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    }
    throw new Error("Invalid token");
  }
};
