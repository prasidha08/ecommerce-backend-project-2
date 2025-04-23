import { NextFunction, Request, Response } from "express";
import { UserModel, ROLE } from "../model/user.model";
import {
  comparePassword,
  hashedPassword,
  jwtToken,
} from "../utility/auth.utility";
import { LoginZodType } from "../types/auth";
import { ErrorHandler } from "../utility/errorHandler";
const register = async (req: Request, res: Response, next: NextFunction) => {
  // first time db user
  //1. db already
  //   2. error ==> already garxa
  // creaate

  const requestedByClient = req.body;

  const {
    email,
    firstName,
    lastName,
    shippingAddress,
    phoneNumber,
    additionalPhoneNumber,
    password,
  } = requestedByClient;

  //   const { userId } = req.params;
  //   const query = req.query;

  // password // encrypt

  const encryptedPassword = hashedPassword(password);

  try {
    const user = await UserModel.find({
      email: requestedByClient.email,
    });

    if (user.length === 0) {
      await UserModel.create({
        email,
        firstName,
        lastName,
        shippingAddress,
        phoneNumber,
        additionalPhoneNumber,
        role: ROLE.CUSTOMER,
        password: encryptedPassword,
      });
    } else {
      throw new ErrorHandler("User is already registered", 400);
    }
    res.status(201).json({
      message: "Registered",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const requestedByClient: LoginZodType = req.body;

  const { email, password } = requestedByClient;

  console.log(email, password, "this is email and password..");

  try {
    const user = await UserModel.find({
      email,
    });

    if (!user || user.length === 0) {
      throw new ErrorHandler("Either password or email didn't match", 400);
    }

    // user
    const isPasswordValidate = comparePassword(
      password,
      user[0]?.password ?? ""
    );

    if (!isPasswordValidate) {
      throw new ErrorHandler("Either password or email didn't match", 400);
    }

    const { email: userEmail, _id, role } = user[0];
    // client token

    const { password: _passwordToRemove, ...remainigDate } = user[0].toObject();

    const token = jwtToken({
      payload: { email: userEmail ?? "", _id, role: role! },
      // expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
      expiresIn: 60 * 60,
    });

    res.status(200).json({
      message: "User is logged in.",
      success: true,
      data: {
        accessToken: token,
        details: remainigDate,
      },
    });
  } catch (error) {
    next(error);
  }
};

export = {
  register,
  login,
};
