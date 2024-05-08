import { userModel } from "../../../DB/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";

// add Friend
export const addFriend = catchError(async (req, res, next) => {
  let { friendId } = req.params;
  let user = req.user;
  const friend = await userModel.findById(friendId);

  if (!friend) {
    return next(new AppError("User not found", 404));
  }

  if (friend.friends.includes(user._id.toString())) {
    return res
      .status(400)
      .json({ message: "User is already a friend", friend });
  }

  if (friend.friendRequests.includes(user._id.toString())) {
    return res
      .status(400)
      .json({ message: "Friend Request has already been sent" });
  } else {
    await userModel.findByIdAndUpdate(
      friendId,
      { $push: { friendRequests: user._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({ message: "Friend Request has been sent"});
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
    { $push: { friends: friendId }, $pull: { friendRequests: friendId } },
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
export const cancelRequest = catchError(async (req, res, next) => {
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

//get friends
export const getFriends = catchError(async (req, res, next) => {
  let user = req.user;
  user = await userModel
    .findById(user._id)
    .populate("friends", "name profilePicture");

  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({ message: "Success", friends: user.friends });
});

// suggested friends
export const suggestedFriends = catchError(async (req, res, next) => {
  let user = req.user;
  user = await userModel.findById(user._id);
  let friends = await userModel
    .find({ _id: { $nin: [...user.friends, ...user.friendRequests, user._id] } })
    .select("name profilePicture")
    .limit(5);

  if (!friends) {
    return next(new AppError("No friends found", 404));
  }
  res.status(200).json({ message: "Success", friends });
});

// remove friend
export const removeFriend = catchError(async (req, res, next) => {
  let { friendId } = req.params;
  let user = req.user;

  const friend = await userModel.findById(friendId);
  if (!friend) {
    return next(new AppError("User not found", 404));
  }

  if (!user.friends.includes(friend._id.toString())) {
    return res.status(400).json({ message: "User is not a friend" });
  }

  const updatedUser = await userModel.findByIdAndUpdate(
    user._id,
    { $pull: { friends: friendId } },
    { new: true, useFindAndModify: false }
  );

  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }

  await userModel.findByIdAndUpdate(
    friendId,
    { $pull: { friends: user._id } },
    { new: true, useFindAndModify: false }
  );

  res.status(200).json({ message: "Friend removed" });
});