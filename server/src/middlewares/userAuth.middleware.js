import pkg from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
const { verify } = pkg;

export const userAuth = AsyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
  if (!token) {
    throw new ApiError(401, "Invalid authorization");
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      throw new ApiError(403, "Invalid token");
    }
    req.body.userId = decoded.id;
    req.user = decoded.id;
    next();
  } catch (error) {
    throw new ApiError(403, "Expired or invalid token");
  }
});
