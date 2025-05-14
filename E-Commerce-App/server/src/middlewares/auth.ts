import { User } from "../models/user.js";
import ErrorHandler from "../utils/utilityClass.js";
import { TryCatch } from "./error.js";

// Middleware to make sure only is allowed
//  route- api/v1/user/?id=123
export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return next(new ErrorHandler("You have to log in first, child", 401));

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Kutey, You give me fake id", 401));

  if (user.role !== "admin") {
    return next(
      new ErrorHandler(
        "Kuttey, yeh website tune bnaee hai jo muh utha kr edhr chlaa aa rha hai..",
        403
      )
    );
  }
  next();
});
