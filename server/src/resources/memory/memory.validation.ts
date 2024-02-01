import Joi from 'joi';

const createMemory = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().required(),
    quote: Joi.string().required(),
    image: Joi.string().allow(null, ''),
});

const updateMemory = Joi.object({
    name: Joi.string(),
    title: Joi.string(),
    quote: Joi.string(),
    image: Joi.string(),
});

const deleteMemory = Joi.object({
    id: Joi.string().required(),
});

export default { createMemory, updateMemory, deleteMemory };
