import UserModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const getUserData = AsyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.user).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User data fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Error getting user data");
  }
});
