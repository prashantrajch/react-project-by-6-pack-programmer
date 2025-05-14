import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utilityClass.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, email, photo, gender, dob, _id } = req.body;

      let user = await User.findById(_id);

      if (user) {
        return res.status(200).json({
          success: true,
          message: `Welcome, ${user.name}`,
        });
      }
      if (!name || !email || !photo || !gender || !dob || !_id) {
        return next(new ErrorHandler("Please add all fields", 400));
      }

      user = await User.create({
        name,
        email,
        photo,
        gender,
        dob: new Date(dob),
        _id,
      });

      res.status(201).json({
        success: true,
        message: `Welcome, ${user.name}`,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});

  return res.status(201).json({
    success: true,
    users,
  });
});

export const getUser = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  return res.status(201).json({
    success: true,
    user,
  });
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  await user.deleteOne();

  return res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
