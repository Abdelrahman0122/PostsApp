 import joi from 'joi';

 export const SignUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
     });

 export const SignInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
     });
     
 export const ChangePasswordSchema = joi.object({
    oldPassword: joi.string().min(6).required(),
    newPassword: joi.string().min(6).required(),
     });
         