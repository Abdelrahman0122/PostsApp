import express from "express";
import { multerCloud,allowedValidation} from "../../utils/multerHost.js";
import * as auth from "./auth.controller.js";   
 export const authRouter = express.Router();


authRouter.post("/signUp", multerCloud(allowedValidation.image).single("profilePicture"),auth.signUp);
authRouter.post("/signIn", auth.signIn);
authRouter.post("/logout", auth.logout);
authRouter.post("/changePassword",auth.protectRoutes ,auth.changePassword);

