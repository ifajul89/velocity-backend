import { z } from 'zod';

const productSchema = z.object({
  product: z
    .string()
    .regex(/^[a-f\d]{24}$/i, { message: 'Invalid product ObjectId' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer' }),
  price: z
    .number()
    .nonnegative({ message: 'Price must be 0 or greater' })
    .optional(),
});

const orderValidation = z.object({
  body: z.object({
    userId: z
      .string()
      .regex(/^[a-f\d]{24}$/i, { message: 'Invalid UserID ObjectId' })
      .optional(),
    customerFirstName: z.string().min(1, { message: 'First name is required' }),
    customerLastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(1, { message: 'Phone number is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    zipCode: z.string().min(1, { message: 'ZIP code is required' }),
    products: z
      .array(productSchema)
      .min(1, { message: 'At least one product is required' }),
    status: z
      .enum(['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'])
      .optional()
      .default('Pending'),
    subtotal: z.number().nonnegative().optional(),
    tax: z.number().nonnegative().optional(),
    transaction: z
      .object({
        body: z.object({
          id: z.string(),
          transactionStatus: z.string(),
          bank_status: z.string(),
          sp_code: z.string(),
          sp_message: z.string(),
          method: z.string(),
          date_time: z.string(),
        }),
      })
      .optional(),
    totalPrice: z
      .number()
      .nonnegative({ message: 'Total price must be 0 or greater' })
      .optional(),
  }),
});

export default orderValidation;
