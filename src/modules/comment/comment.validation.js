import Joi from 'joi';

export const CreateCommentSchema = Joi.object({
    comment: Joi.string().required(),
    postId: Joi.string().required(),
});

export const UpdateCommentSchema = Joi.object({
    comment: Joi.string().required(),
});
