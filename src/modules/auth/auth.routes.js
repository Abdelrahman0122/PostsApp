import express from "express";
import * as auth from "./auth.controller.js";
import { validation } from "../../middleware/validation.js";
import {
  ChangePasswordSchema,
  SignInSchema,
  SignUpSchema,
} from "./auth.validation.js";
import { fileUpload } from "../../utils/multer.js";


export const authRouter = express.Router();


authRouter.post(
  "/signUp",
  fileUpload('profilePicture'),
  validation(SignUpSchema),
  auth.signUp
);
authRouter.post("/signIn", validation(SignInSchema), auth.signIn);
authRouter.post("/logout", auth.logout);
authRouter.post(
  "/changePassword",
  validation(ChangePasswordSchema),
  auth.protectRoutes,
  auth.changePassword
);
authRouter.post("/forgetPassword", auth.forgetPassword);
authRouter.post("/resetPassword", auth.resetPassword);
authRouter.patch("/updateUser/:id", auth.protectRoutes ,auth.updateUser)




