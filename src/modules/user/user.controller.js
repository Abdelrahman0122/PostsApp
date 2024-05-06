import { userModel } from "../../../DB/models/user.model.js";
import APiFeatures from "../../utils/APIFeatures.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";

export const addUser = catchError(async (req, res, next) => {
  const { email } = req.body;
  let foundedUser = await userModel.findOne({ email }).populate("posts");
  if (foundedUser) {
    return next(new AppError("user already exist", 409));
  }
  const user = new userModel(req.body);
  await user.save();
  res.status(201).json({ message: "user added successfully", user });
});

// get all users
export const getAllusers = catchError(async (req, res, next) => {
  let apiFeatures = new APiFeatures(
    userModel.find({}).select("-password").populate("posts"),
    req.query
  )
    .pagination()
    .sort()
    .search()
    .fields();
  let result = await apiFeatures.mongooseQuery.find({});
  res.status(201).json({ message: "Success", page: apiFeatures.page, result });
});

// delete user by id
export const deleteuser = catchError(async (req, res, next) => {
  let { id } = req.params;
  let Foundeduser = await userModel.findById(id);
  !Foundeduser && next(new AppError("user not found", 404));
  if (Foundeduser) {
    let user = await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted", user });
  }
});

// get user by id
export const getUserById = catchError(async (req, res, next) => {
  let { id } = req.params;
  let Foundeduser = await userModel
    .findById(id)
    .populate("posts")
    .select("-password");
  !Foundeduser && next(new AppError("user not found", 404));
  if (Foundeduser) {
    res.status(200).json({ message: "Success", Foundeduser });
  }
});

