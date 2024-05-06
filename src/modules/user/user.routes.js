import express  from "express";
import * as user from "./user.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";

export const userRouter = express.Router();
userRouter.post("/", user.addUser);
userRouter.get("/", user.getAllusers);
userRouter.get("/:id" ,user.getUserById);


