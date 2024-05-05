import Joi from 'joi';

export const CreatePostSchema = Joi.object({
    body: Joi.string().required(),
    privacy: Joi.string(),
    postImage: Joi.string().uri()
});

export const UpdatePostSchema = Joi.object({
    body: Joi.string(),
    privacy: Joi.string(),
    postImage: Joi.string().uri()
});