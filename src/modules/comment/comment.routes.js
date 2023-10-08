import express from "express";
import * as comment from "./comment.controller.js";   
import { protectRoutes } from "../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { CreateCommentSchema, UpdateCommentSchema } from "./comment.validation.js";

 export const commentRouter = express.Router();

   commentRouter.post("/addComment/:id",validation(CreateCommentSchema),protectRoutes ,comment.addComment);
   commentRouter.get("/getAllComments/:id", comment.getAllComments);
   commentRouter.patch("/editComment/:id",validation(UpdateCommentSchema),protectRoutes ,comment.editComment);
   commentRouter.delete("/deleteComment/:id",protectRoutes ,comment.deleteComment);





