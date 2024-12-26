import pkg from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
const { verify } = pkg;

export const userAuth = AsyncHandler(async (req, res, next) => {
  const token = await req.cookies.token;
  console.log('all cookies ',req.cookies)
  console.log(token)
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
