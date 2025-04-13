import { UserModel } from './user.model';

// 3. Get all user
const getAllUser = async () => {
  const result = await UserModel.find();
  return result;
}; // 3. Get a Specific user
const getSingleUser = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};

export const userService = { getSingleUser, getAllUser };
