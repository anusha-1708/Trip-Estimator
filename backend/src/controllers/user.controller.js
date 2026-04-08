import { getUsers } from "../services/user.service.js";

export const getUsersController = async (req, res) => {
  try {
    const users = await getUsers(req.user.id);
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
