/* eslint-disable @typescript-eslint/no-explicit-any */
import Shurjopay from 'shurjopay';
import config from '../../config';

// Create a new instance of ShurjoPay
const shurjopay = new Shurjopay();

// Configure ShurjoPay with credentials - use uppercase env var names
shurjopay.config(
  config.SP.sp_endpoint!,
  config.SP.sp_username!,
  config.SP.sp_password!,
  config.SP.sp_prefix!,
  config.SP.sp_return_url!,
);

// Log configuration details

// Define ShurjoPay response types
interface PaymentResponse {
  checkout_url: string;
  amount: number;
  currency: string;
  sp_order_id: string;
  customer_order_id: string;
  customer_name: string;
  customer_address: string;
  customer_city: string;
  customer_phone: string;
  customer_email: string;
  client_ip: string;
  intent: string;
  transactionStatus: string;
  status?: string;
  msg?: string;
  message?: string;
  bank_status?: string;
  sp_code?: string;
  sp_message?: string;
  [key: string]: any; // For any other properties
}

interface VerificationResponse {
  id?: string;
  order_id?: string;
  currency?: string;
  amount?: number;
  payable_amount?: number;
  discount_amount?: number;
  disc_percent?: number;
  received_amount?: number;
  usd_amt?: number;
  usd_rate?: number;
  card_holder_name?: string;
  card_number?: string;
  phone_no?: string;
  bank_status?: string;
  transaction_status?: string;
  transaction_time?: string;
  bank_trx_id?: string;
  invoice_no?: string;
  sp_code?: string;
  sp_message?: string;
  message?: string;
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  value1?: string;
  value2?: string;
  value3?: string;
  value4?: string;
  [key: string]: any; // For any other properties
}

const makePaymentAsync = async (
  paymentPayload: any,
): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response: any) => {
        resolve(response);
      },
      (error: any) => {
        reject(error);
      },
    );
  });
};

const verifyPaymentAsync = async (
  order_id: string,
): Promise<VerificationResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      },
    );
  });
};

export const orderUtils = {
  makePaymentAsync,
  verifyPaymentAsync,
};

//shurjopay.makePayment()

// console.log(shurjopay);

// const makePaymentAsync = async (
//     paymentPayload: any
// ): Promise<PaymentResponse> => {
//     return new Promise((resolve, reject) => {
//         shurjopay.makePayment(
//             paymentPayload,
//             (response) => resolve(response),
//             (error) => reject(error)
//         );
//     });
// };

// const verifyPaymentAsync = (
//     order_id: string
// ): Promise<VerificationResponse[]> => {
//     return new Promise((resolve, reject) => {
//         shurjopay.verifyPayment(
//             order_id,
//             (response) => resolve(response),
//             (error) => reject(error)
//         );
//     });
// };
