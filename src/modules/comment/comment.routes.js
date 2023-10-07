import express from "express";
import * as comment from "./comment.controller.js";   
import { protectRoutes } from "../auth/auth.controller.js";

 export const commentRouter = express.Router();

   commentRouter.post("/addComment/:id",protectRoutes ,comment.addComment);
   commentRouter.get("/getAllComments/:id", comment.getAllComments);
   commentRouter.patch("/editComment/:id",protectRoutes ,comment.editComment);
   commentRouter.delete("/deleteComment/:id",protectRoutes ,comment.deleteComment);





