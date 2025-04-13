import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';
import config from '../config';
import AppError from '../errors/appError';
import httpStatus from 'http-status';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // checking if the token is missing
    if (!token) {
      throw new Error('You are not authorized!');
    }
    // console.log(token);
    // checking if the given token is valid
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.JWT_ACCESS_SECRET as string,
      ) as JwtPayload;
    } catch (err) {
      console.log(err);
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    const { role, email } = decoded;

    // checking if the user is exist
    const user = await UserModel.findOne({ email });
    // console.log(user);

    if (!user) {
      throw new Error('This user is not found !');
    }

    // checking if the user is blocked
    const userStatus = user?.isBlocked;

    if (userStatus === true) {
      throw new Error('This user is blocked ! !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized');
    }
    // console.log("User from auth", user);
    // req.user = decoded as JwtPayload;
    req.user = user;
    next();
  });
};

export default auth;
