import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { catchError } from "../../utils/catchError.js";
import { userModel } from '../../../DB/models/user.model.js';
import { AppError } from '../../utils/AppError.js';
import cloudinary from '../../utils/cloudinary.js';

export const signUp = catchError(async (req, res, next) => {
  let isFound = await userModel.findOne({ email: req.body.email });
  if (isFound) {
    next(new AppError("email already exist", 400));
  }
  let user = new userModel(req.body);
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
      folder: "SocialMedia",
    });
    user.profilePicture = { secure_url, public_id };
  }
  await user.save();
  res.status(201).json({
    status: "success",
    data: user,
  });
});

export const signIn = catchError(async (req, res, next) => {
    let { email, password } = req.body;
    let isFound = await userModel.findOne({ email });
  
    if (!isFound) {
      return next(new AppError("email not found", 404));
    }
  
    const match = bcrypt.compareSync(password, isFound.password);
  console.log(isFound)
    if (!match) {
      return next(new AppError("incorrect password", 400));
    }
  
    let token = jwt.sign({ name: isFound.name, role: isFound.role, userId: isFound._id }, "abdo");
    isFound.isOnline = true;
    await isFound.save();
  
    res.status(200).json({
      status: "success",
      token
    });
  });
  

export const logout = catchError(async (req, res,next) => {
    let { token } = req.headers;
    if (!token) return next(new AppError("you are not logged in", 401));
    // verify token
    let decode = await jwt.verify(token, "abdo");
    console.log(decode);
    // check if user is still exist
    let user = await userModel.findById(decode.userId);
    if (!user) return next(new AppError("user is not exist", 401));
    user.isOnline = false;
    await user.save();
    res.status(200).json({
        status: "success",
        data: null
    })
})

export const changePassword = catchError(async (req, res,next) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
  
    const user = await userModel.findById(userId);

    const match = bcrypt.compareSync(oldPassword, user.password);
    if (!match) {
      return next(new AppError("Old password is incorrect", 400));
    }
    
  
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    if (oldPassword === newPassword) {
      return next(new AppError("New password must be different from the old password", 400));
    }  
    user.password = newPassword;
    await user.save();
  
    res.json({ message: "Password changed successfully" });
})

export const protectRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new AppError("you are not logged in", 401));
  let decode = await jwt.verify(token, "abdo");
  // check if user is still exist
  let user = await userModel.findById(decode.userId);
  if (!user) return next(new AppError("user is not exist", 401));

  if(user.changePasswordAt){
  let changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000);
    if (decode.iat < changePasswordTime) {
        return next(new AppError("user recently changed password", 401));
    }}
    
    req.user = user;
    next();
});


export const allowTo = (...roles) => {
    return catchError((req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("you are not allowed to do this action", 403));
        }
        next();
    })
}