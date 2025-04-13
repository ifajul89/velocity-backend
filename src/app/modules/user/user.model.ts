/* eslint-disable @typescript-eslint/no-this-alias */

import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    // city: { type: String, required: true },
    // address: { type: String, required: true, default: "Dhaka,Bangladesh" },
    email: { type: String, required: true, unique: true },
    // phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.BCRYPT_SALT_ROUNDS),
  );
  next();
});

UserSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

export const UserModel = model<TUser>('User', UserSchema);
