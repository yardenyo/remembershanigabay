import Joi from 'joi';
import { MediaType } from '@/resources/media/media.interface';

const createMedia = Joi.object({
    type: Joi.string().valid(MediaType.IMAGE, MediaType.VIDEO).required(),
    title: Joi.string().min(3).max(40).required(),
    url: Joi.string().required(),
});

const updateMedia = Joi.object({
    type: Joi.string().valid(MediaType.IMAGE, MediaType.VIDEO),
    title: Joi.string().min(3).max(40),
    url: Joi.string(),
});

const deleteMedia = Joi.object({
    id: Joi.string().required(),
});

export default { createMedia, updateMedia, deleteMedia };
