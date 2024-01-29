import Joi from 'joi';

const createEvent = Joi.object({
    title: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
});

const updateEvent = Joi.object({
    title: Joi.string(),
    date: Joi.date(),
    time: Joi.string(),
    location: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
});

const deleteEvent = Joi.object({
    id: Joi.string().required(),
});

export default { createEvent, updateEvent, deleteEvent };
