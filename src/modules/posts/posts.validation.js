import Joi from 'joi';

export const CreatePostSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    privacy: Joi.string()
});

export const UpdatePostSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    privacy: Joi.string()
});

