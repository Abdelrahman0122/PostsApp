import Joi from 'joi';

export const CreatePostSchema = Joi.object({
    body: Joi.string().required(),
    privacy: Joi.string(),
});

export const UpdatePostSchema = Joi.object({
    body: Joi.string(),
    privacy: Joi.string(),
});