import Joi from 'joi';

const createCandle = Joi.object({
    name: Joi.string().required(),
    text: Joi.string().required(),
});

const updateCandle = Joi.object({
    name: Joi.string(),
    text: Joi.string(),
});

const deleteCandle = Joi.object({
    id: Joi.string().required(),
});

export default { createCandle, updateCandle, deleteCandle };
