import express from "express";
import * as post from "./posts.controller.js";   
import { protectRoutes } from "../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { CreatePostSchema, UpdatePostSchema } from "./posts.validation.js";
import { fileUpload } from "../../utils/multer.js";

 export const postRouter = express.Router();

    postRouter.post("/addPost", fileUpload('postImage'),validation(CreatePostSchema),protectRoutes ,post.addPost); 
    postRouter.get("/getAllPosts", post.getAllPosts);
    postRouter.get("/getPostsByUser/:id", post.getPostsByUser);
    postRouter.get("/getSinglePost/:id", post.getSinglePost);
    postRouter.put("/updatePost/:id",protectRoutes ,post.updatePost);
    postRouter.delete("/deletePost/:id",protectRoutes , post.deletePost);
    postRouter.get("/getPrivatePosts",protectRoutes , post.getPrivatePosts);
    postRouter.post("/likePost/:id",protectRoutes , post.likePost);

 
    
