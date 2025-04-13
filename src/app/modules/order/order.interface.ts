import { Types } from 'mongoose';

export interface TOrder {
  user: Types.ObjectId;
  customerFirstName: string;
  customerLastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  products: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
