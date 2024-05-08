import express from "express";
import * as friend from "./friend.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";


export const friendRouter = express.Router();



friendRouter.post("/addFriend/:friendId", protectRoutes ,friend.addFriend);
friendRouter.post("/acceptRequest/:friendId", protectRoutes ,friend.acceptRequest)
friendRouter.delete("/cancelRequest/:friendId", protectRoutes ,friend.cancelRequest)
friendRouter.get("/getRequests", protectRoutes ,friend.getRequests)
friendRouter.get("/getFriends", protectRoutes ,friend.getFriends)
friendRouter.get("/suggestedFriends", protectRoutes ,friend.suggestedFriends)
friendRouter.delete("/deleteFriend/:friendId", protectRoutes ,friend.removeFriend)
