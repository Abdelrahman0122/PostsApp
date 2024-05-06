import { PostsModel } from "../../../DB/models/posts.model.js";
import { userModel } from "../../../DB/models/user.model.js";
import APiFeatures from "../../utils/APIFeatures.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";
import cloudinary from "../../utils/cloudinary.js";

// add post
export const addPost = catchError(async (req, res, next) => {
  let post = new PostsModel(req.body);
  post.user = req.user._id;
  post.privacy = req.body.privacy || 'private';
  if (req.file) {
    console.log(req.file);
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      folder: "SocialMedia/Posts",
    });
    post.postImage = secure_url;
  }else{
    post.postImage = null;
    next(new AppError("please upload image", 400));
  }
  let updatedUser = await userModel.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } });

  if (!updatedUser) {
    res.status(500).json({ message: "Failed to update user" });
  } else {
    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } 
});

// get all posts (Public Only)
export const getAllPosts = catchError(async (req, res, next) => {
  try {
    const apiFeatures = new APiFeatures(
      PostsModel.find({ privacy: "public" }),
      req.query
    )
      .populate("user", "name profilePicture")
      .pagination()
      .sort()
      .search()
      .fields();
    const result = await apiFeatures.mongooseQuery;
    res
      .status(200)
      .json({ message: "Success", page: apiFeatures.page, result });
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
});

// get posts by single user
export const getPostsByUser = catchError(async (req, res, next) => {
  let posts = await PostsModel.find({ user: req.params.id }).populate(
    "user",
    "name profilePicture",
  );
  if (!posts.length) {
    res.status(200).json({
      message: "no posts found",
      posts,
    });
  }
  res.status(200).json({
    message: "success",
    posts,
  });
});

// get single post by id
export const getSinglePost = catchError(async (req, res, next) => {
  let { id } = req.params;
  let post = await PostsModel.findById(id).populate("user", "name");
  if (!post) {
    return next(new AppError("post not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: post,
  });
});

// update post - change  body or privacy
export const updatePost = catchError(async (req, res, next) => {
  let { id } = req.params;
  let { _id } = req.user; // get userId from logged-in user
  let post = await PostsModel.findById(id);

  if (!post) {
    return next(new AppError("post not found", 404));
  }

  if (!post.user.equals(_id)) {
    // check if logged-in user is post owner
    return next(
      new AppError("you are not authorized to update this post", 403)
    );
  }

  post = await PostsModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({ message: "Updated", post });
});

// delete post
export const deletePost = catchError(async (req, res, next) => {
  let { id } = req.params;
  let { _id } = req.user;
  let post = await PostsModel.findById(id);

  if (!post) {
    return next(new AppError("post not found", 404));
  }

  if (!post.user.equals(_id)) {
    // check if logged-in user is post owner
    return next(
      new AppError("you are not authorized to update this post", 403)
    );
  }

  post = await PostsModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Deleted", post });
});

// see private posts by logged-in user
export const getPrivatePosts = catchError(async (req, res, next) => {
  let { _id } = req.user;
  let posts = await PostsModel.find({ user: _id, privacy: "private" });
  res.status(200).json({
    status: "success",
    data: posts,
  });
});

// like post
export const likePost = catchError(async (req, res, next) => {
  const { id } = req.params;
  const post = await PostsModel.findByIdAndUpdate(id, { new: true });

  if (!post) {
    return next(new AppError("post not found", 404));
  }

  const isLiked = post.LikedBy.includes(req.user._id);

  if (isLiked) {
    post.LikedBy.pull(req.user._id);
  } else {
    post.LikedBy.push(req.user._id);
  }

  post.Likes = post.LikedBy.length;
  await post.save();

  const message = isLiked ? "unliked" : "liked";
  res.status(200).json({ message });
});
