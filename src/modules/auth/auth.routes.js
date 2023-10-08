import express from "express";
import { multerCloud,allowedValidation} from "../../utils/multerHost.js";
import * as auth from "./auth.controller.js";   
import { validation } from "../../middleware/validation.js";
import { ChangePasswordSchema, SignInSchema, SignUpSchema } from "./auth.validation.js";
 export const authRouter = express.Router();


authRouter.post("/signUp",validation(SignUpSchema) ,multerCloud(allowedValidation.image).single("profilePicture"),auth.signUp);
authRouter.post("/signIn",validation(SignInSchema) ,auth.signIn);
authRouter.post("/logout",auth.logout);
authRouter.post("/changePassword",validation(ChangePasswordSchema),auth.protectRoutes ,auth.changePassword);

