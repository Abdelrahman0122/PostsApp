import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { catchError } from "../../utils/catchError.js";
import { userModel } from "../../../DB/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from "../../utils/cloudinary.js";
import { customAlphabet } from "nanoid";
import { sendEmail } from "../../email/sendEmail.js";

export const signUp = catchError(async (req, res, next) => {
  let isFound = await userModel.findOne({ email: req.body.email });
  console.log(req.body);
  let { name, email, password } = req.body;
  if (isFound) {
    next(new AppError("email already exist", 400));
  }
  let user = new userModel({ name, email, password });
  if (req.file) {
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      folder: "SocialMedia",
    });
    user.profilePicture = secure_url;
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
  console.log(isFound);
  if (!match) {
    return next(new AppError("incorrect password", 400));
  }
  let token = jwt.sign(
    { name: isFound.name, role: isFound.role, userId: isFound._id },
    "abdo"
  );
  isFound.isOnline = true;
  await isFound.save();

  res.status(200).json({
    status: "success",
    token,
  });
});

export const logout = catchError(async (req, res, next) => {
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
    data: null,
  });
});

export const changePassword = catchError(async (req, res, next) => {
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
    return next(
      new AppError("New password must be different from the old password", 400)
    );
  }
  user.password = newPassword;
  await user.save();
  res.json({ message: "Password changed successfully" });
});

// forget password
export const forgetPassword = catchError(async (req, res, next) => {
  let { email } = req.body;
  let isFounded = await userModel.findOne({ email });
  if (!isFounded) {
    return next(new AppError("email not found", 404));
  } else {
    const nanoid = customAlphabet("1234567890abcdef", 4);
    isFounded.forgetPasswordToken = nanoid(); //=> "4f90d"
    console.log(isFounded.forgetPasswordToken);
    sendEmail({ email, OTP: isFounded.forgetPasswordToken });
  }
  await isFounded.save();
  res.status(200).json({
    status: "OTP sent successfully",
    data: null,
  });
});

export const updateUser = catchError(async (req, res, next) => {
  let { name, about, interests, education } = req.body;
  let { id } = req.params;
  let user = req.user;
  if (user._id != id)
    return next(new AppError("you don't have access to this action ", 403));
  let isFounded = await userModel.findById(id);
  isFounded.name = name;
  isFounded.interests = interests;
  isFounded.about = about;
  isFounded.education = education;
  await isFounded.save();
  res.status(200).json({
    status: "Updated successfully",
    isFounded,
  });
});

export const resetPassword = catchError(async (req, res, next) => {
  let { email, OTP, newPassword } = req.body;
  let isFounded = await userModel.findOne({ email });
  if (OTP != isFounded.forgetPasswordToken) {
    return next(new AppError("OTP is incorrect", 400));
  }
  isFounded.password = newPassword;
  await isFounded.save();
  res.status(200).json({
    status: "Password reset successfully",
    data: null,
  });
});

export const protectRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new AppError("you are not logged in", 401));
  let decode = await jwt.verify(token, "abdo");
  // check if user is still exist
  let user = await userModel.findById(decode.userId);
  if (!user) return next(new AppError("user is not exist", 401));

  if (user.changePasswordAt) {
    let changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000);
    if (decode.iat < changePasswordTime) {
      return next(new AppError("user recently changed password", 401));
    }
  }
  req.user = user;
  next();
});

export const allowTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("you are not allowed to do this action", 403));
    }
    next();
  });
};

// add Friend
export const addFriend = catchError(async (req, res, next) => {
  let { friendId } = req.params;
  let user = req.user;
  const friend = await userModel.findById(friendId);
  
  if (!friend) {
    return next(new AppError("User not found", 404));
  }

  if (friend.friends.includes(user._id.toString())) {
    return res.status(400).json({ message: "User is already a friend", friend });
  }

  if (friend.friendRequests.includes(user._id.toString())) {
    return res.status(400).json({ message: "Friend Request has already been sent" });
  } else {
    await userModel.findByIdAndUpdate(
      friendId,
      { $push: { friendRequests: user._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({ message: "Friend Request has been sent" });
  }
});

// get all requests
export const getRequests = catchError(async (req, res, next) => {
  let user = req.user;
  user = await userModel
    .findById(user._id)
    .populate("friendRequests", "name profilePicture");

  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res
    .status(200)
    .json({ message: "Success", friendRequests: user.friendRequests });
});





// accept Request 
export const acceptRequest = catchError(async (req, res, next) => {
  let { friendId } = req.params;
  let user = req.user;

  const friend = await userModel.findById(friendId);
  if (!friend) {
    return next(new AppError("User not found", 404));
  }
  if (!user.friendRequests.includes(friend._id.toString())) {
    return res.status(400).json({ message: "Friend request not found" });
  }

  await userModel.findByIdAndUpdate(
    user._id,
    { $push: { friends: friendId },$pull: { friendRequests: friendId} },
    { new: true, useFindAndModify: false }
  );

  await userModel.findByIdAndUpdate(
    friendId,
    { $push: { friends: user._id } },
    { new: true, useFindAndModify: false }
  );

  res.status(200).json({ message: "Friend request accepted" });
});







// cancel Request 
export const cancelRequest = catchError(async(req,res,next)=>{
  let { friendId } = req.params;
  let user = req.user;

  const friend = await userModel.findById(friendId);
  if (!friend) {
    return next(new AppError("User not found", 404));
  }

if (!user.friendRequests.includes(friend._id.toString())) {
  return res.status(400).json({ message: "Friend request not found" });
}

  const updatedUser = await userModel.findByIdAndUpdate(
    user._id,
    { $pull: { friendRequests: friendId } },
    { new: true, useFindAndModify: false }
  );

  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({ message: "Friend Request has been cancelled" });
});
