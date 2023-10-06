import express  from "express";
import * as user from "./user.controller.js";

export const userRouter = express.Router();
userRouter.post("/", user.addUser);
userRouter.get("/", user.getAllusers);

