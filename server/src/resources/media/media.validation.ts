import Joi from 'joi';

const createMedia = Joi.object({
    type: Joi.string().required(),
    title: Joi.string().min(3).max(30).required(),
    url: Joi.string().required(),
});

const updateMedia = Joi.object({
    type: Joi.string(),
    title: Joi.string().min(3).max(30),
    url: Joi.string(),
});

const deleteMedia = Joi.object({
    id: Joi.string().required(),
});

export default { createMedia, updateMedia, deleteMedia };
