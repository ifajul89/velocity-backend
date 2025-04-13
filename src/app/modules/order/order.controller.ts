/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { orderService } from './order.service';
const createOrder = catchAsync(async (req, res) => {
  const user = req.user;

  // Check if required customer information is present in the request body
  const {
    customerFirstName,
    customerLastName,
    email,
    phone,
    address,
    city,
    zipCode,
    products,
  } = req.body;

  if (
    !customerFirstName ||
    !customerLastName ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !zipCode
  ) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      message: 'Missing required customer information',
      data: null,
    });
  }

  // Verify products array is not empty
  if (!products || !Array.isArray(products) || products.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      message: 'Order must contain at least one product',
      data: null,
    });
  }

  // Verify each product has valid ID and quantity
  for (const product of products) {
    if (!product.product || !product.quantity || product.quantity <= 0) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Each product must have a valid ID and quantity',
        data: null,
      });
    }
  }

  const order = await orderService.createOrder(user, req.body, req.ip!);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Order placed successfully',
    data: order,
  });
});

// verify order
const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Order verified successfully',
    data: order,
  });
});
// get order
const getOrders = catchAsync(async (req, res) => {
  const order = await orderService.getOrders();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Order retrieved successfully',
    data: order,
  });
});

const getRevenue = catchAsync(
  async (_req: Request, res: Response, next: NextFunction) => {
    const totalRevenue = await orderService.calculateRevenue();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: 'Total revenue is get successfully',
      data: totalRevenue,
    });
  },
);
const getDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const is
    const details = await orderService.getDetails();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: 'Order details is get successfully',
      data: details,
    });
  },
);

export const orderController = {
  createOrder,
  getRevenue,
  getDetails,
  verifyPayment,
  getOrders,
};
