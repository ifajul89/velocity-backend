/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';
import httpStatus from 'http-status';

// 2. Get All user
const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getAllUser();
    // console.log(result);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: 'User are retrieved successfully',
      data: result,
    });
    // res.send(result)
  },
);
// 3. Get a Specific user
const getSingleUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await userService.getSingleUser(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: 'user is retrieved successfully',
      data: result,
    });
  },
);

export const userController = { getUsers, getSingleUsers };
