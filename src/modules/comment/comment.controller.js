import { commentModel } from "../../../DB/models/Comment.model.js";
import { PostsModel } from "../../../DB/models/posts.model.js";
import APiFeatures from "../../utils/APIFeatures.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";


//ADD COMMENT
 export const addComment = catchError(async (req, res,next) => {
  let { postId } = req.body;
  let post = await PostsModel.findOne({ _id: postId, privacy: "public" });
    if (!post) {
    return next(new AppError("post not found", 404));
  }
  req.body.userImage = req.user.profilePicture;
  req.body.userName = req.user.name;
 let comment = new commentModel(req.body);
  comment.user = req.user._id;
  comment.post = postId;
  await comment.save();
  res.json({ message: "success", comment });
 });

 // GET ALL COMMENTS FOR SINGLE POST
 export const getAllComments = catchError(async (req, res,next) => {
  let { id } = req.params;
  let post = await PostsModel.findById(id);
  if (!post) {
    return next(new AppError("post not found", 404));
  }
  let apiFeatures = new APiFeatures(
    commentModel.find({ post: id}),
    req.query
  )
    .pagination()
    .sort()
    .search()
    .fields();
  let comments = await apiFeatures.mongooseQuery.find({});
  res.json({ message: "success", comments });
 });

 // Edit my Comment
 export const editComment = catchError(async (req, res,next) => {
  let { id } = req.params;
  let { _id } = req.user; // get userId from logged-in user
  let comment = await commentModel.findById(id);

  if (!comment) {
    return next(new AppError("comment not found", 404));
  }

  if (!comment.user.equals(_id)) { // check if logged-in user is comment owner
      return next(new AppError("you are not authorized to update this comment", 403));
    }

    comment = await commentModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({ message: "Updated", comment });
}); 

// delete my comment
export const deleteComment = catchError(async (req, res,next) => {
  let { id } = req.params;
  let { _id } = req.user; // get userId from logged-in user
  let comment = await commentModel.findById(id);
  let post = await PostsModel.findById(comment.post);

  if (!comment) {
    return next(new AppError("comment not found", 404));
  }

  if (!comment.user.equals(_id) && !post.user.equals(_id)) { // check if logged-in user is comment owner
      return next(new AppError("you are not authorized to delete this comment", 403));
    }

    comment = await commentModel.findByIdAndDelete(id);

  res.status(200).json({ message: "Deleted", comment });
});