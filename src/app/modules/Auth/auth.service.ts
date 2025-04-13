import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import { ILogInUser } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const register = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};
const login = async (payload: ILogInUser) => {
  const user = await UserModel.findOne({ email: payload?.email });
  if (!user) {
    throw new Error('User not found.');
  }
  const isBlocked = user?.isBlocked;
  if (isBlocked === true) {
    throw new Error('This user is blocked');
  }

  const checkPassword = await bcrypt.compare(payload?.password, user?.password);

  if (!checkPassword) {
    throw new Error('Password does not match!');
  }
  // generate token for authorization
  const token = jwt.sign(
    { email: user?.email, role: user?.role },
    config.JWT_ACCESS_SECRET as string,
    { expiresIn: '30d' },
  );
  // console.log(token);
  const refreshToken = jwt.sign(
    { email: user?.email, role: user?.role },
    config.JWT_REFRESH_SECRET as string,
    { expiresIn: '365d' },
  );

  const verifyUser = {
    name: user.name,
    email: user?.email,
    role: user?.role,
    id: user?._id,
  };
  // console.log(user);

  return { token, refreshToken, verifyUser };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.JWT_REFRESH_SECRET as string,
  ) as JwtPayload;

  const { email } = decoded;

  // checking if the user is exist
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error('This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new Error('This user is blocked ! !');
  }

  const accessToken = jwt.sign(
    { email: user?.email, role: user?.role },
    config.JWT_ACCESS_SECRET as string,
    { expiresIn: '10d' },
  );

  return { accessToken };
};

export const authService = {
  register,
  login,
  refreshToken,
};
