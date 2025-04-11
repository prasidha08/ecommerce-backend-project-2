import { NextFunction, Request, Response } from "express";
import { UserModel, ROLE } from "../model/user.model";
import {
  comparePassword,
  hashedPassword,
  jwtToken,
} from "../utility/auth.utility";
import { LoginZodType } from "../types/auth";
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
      throw new Error("Already registered");
    }
    res.json({
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

  try {
    const user = await UserModel.find({
      email,
    });

    if (!user || user.length === 0) {
      throw new Error("Either password or email didn't match");
    }

    // user
    const isPasswordValidate = comparePassword(
      password,
      user[0]?.password ?? ""
    );

    if (!isPasswordValidate) {
      throw new Error("Either password or email didn't match");
    }

    const { email: userEmail, _id, role } = user[0];
    // client token

    const { password: _passwordToRemove, ...remainigDate } = user[0];

    const token = jwtToken({
      payload: { email: userEmail ?? "", _id, role: role! },
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
    });

    res.json({
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
