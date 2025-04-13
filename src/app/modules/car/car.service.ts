import { sendImageToCloudinary } from '../../utils/sendImageCloudinary';
import { TCar } from './car.interface';
import { CarModel } from './car.modle';

// 1. Create a Car
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createCarInDB = async (car: TCar, file: any) => {
  // console.log(car, file, "console from car service");

  const imageName = car?.name;
  const path = file?.path;
  const { secure_url } = await sendImageToCloudinary(imageName, path);
  car.image = secure_url as string;
  const result = await CarModel.create(car);
  return result;
};
// 2. Get All Cars
const getAllCarsFromDb = async (query: Record<string, unknown>) => {
  const searchableFields = ['name', 'model', 'brand', 'category'];
  const queryObj = { ...query };

  const excludingImportant = [
    'searchTerm',
    'page',
    'limit',
    'sortOrder',
    'sortBy',
    'fields',
  ];
  // what field don't need to filtering
  excludingImportant.forEach((key) => delete queryObj[key]);

  const searchTerm = query?.searchTerm || '';
  const searchQuery = CarModel.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // Filtering
  const filterQuery = searchQuery.find(queryObj);

  // Pagination

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 6;
  // // skip = (page-1)*limit
  const skip = (page - 1) * limit;

  // // const result = await filterQuery.skip(skip).limit(limit)
  const paginatedQuery = filterQuery.skip(skip).limit(limit);

  let sortStr;

  if (query?.sortBy && query?.sortOrder) {
    const sortBy = query?.sortBy;
    const sortOrder = query?.sortOrder;
    // "-price" or "price"
    sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
  }

  const sortQuery = paginatedQuery.sort(sortStr);

  let fields = '-__v';

  if (query?.fields) {
    fields = (query.fields as string)?.split(',').join(' ');
  }

  const result = await sortQuery.select(fields);

  return result;
};
// 3. Get a Specific Car
const getSpecificCar = async (id: string) => {
  const result = await CarModel.findById(id);
  return result;
};
// 4. Update a Car
const updateCar = async (id: string, data: TCar) => {
  const result = await CarModel.findByIdAndUpdate(id, data, { new: true });
  return result;
};
// 5. Delete a Car
const deleteCar = async (id: string) => {
  const result = await CarModel.findByIdAndDelete(id);
  return result;
};

export const CarServices = {
  createCarInDB,
  getAllCarsFromDb,
  getSpecificCar,
  updateCar,
  deleteCar,
};
