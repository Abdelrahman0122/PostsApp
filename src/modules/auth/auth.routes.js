import express from "express";
import * as auth from "./auth.controller.js";   
 export const authRouter = express.Router();


authRouter.post("/signUp", auth.signUp);
authRouter.post("/signIn", auth.signIn);
authRouter.post("/logout", auth.logout);
authRouter.post("/changePassword",auth.protectRoutes ,auth.changePassword);

