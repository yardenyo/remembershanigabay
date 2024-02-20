"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationContent = exports.serviceContent = exports.modelContent = exports.interfaceContent = exports.controllerContent = void 0;
function capitalizeFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}
const controllerContent = (resourceName) => `
import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/${resourceName.toLowerCase()}/${resourceName.toLowerCase()}.validation';
import ${capitalizeFirstLetter(resourceName)}Service from '@/resources/${resourceName.toLowerCase()}/${resourceName.toLowerCase()}.service';
import {
  authMiddleware,
} from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class ${capitalizeFirstLetter(resourceName)}Controller implements Controller {
  public path = '/${resourceName.toLowerCase()}s';
  public router = Router();
  private ${resourceName}Service = new ${capitalizeFirstLetter(resourceName)}Service();

  constructor() {
      this.initializeRoutes();
  }

  private initializeRoutes(): void {

  }

  
}

export default ${capitalizeFirstLetter(resourceName)}Controller;
`;
exports.controllerContent = controllerContent;
const interfaceContent = (resourceName) => `
import { Document } from 'mongoose';

export default interface ${capitalizeFirstLetter(resourceName)} extends Document {
}
`;
exports.interfaceContent = interfaceContent;
const modelContent = (resourceName) => `
import { Schema, model } from 'mongoose';
import ${capitalizeFirstLetter(resourceName)} from '@/resources/${resourceName.toLowerCase()}/${resourceName.toLowerCase()}.interface';

const ${capitalizeFirstLetter(resourceName)}Schema = new Schema(
  {
  },
  { timestamps: true },
);

const ${capitalizeFirstLetter(resourceName)}Model = model<${capitalizeFirstLetter(resourceName)}>(
  '${capitalizeFirstLetter(resourceName)}',
  ${capitalizeFirstLetter(resourceName)}Schema,
);

export default ${capitalizeFirstLetter(resourceName)}Model;
`;
exports.modelContent = modelContent;
const serviceContent = (resourceName) => `
import ${capitalizeFirstLetter(resourceName)} from '@/resources/${resourceName.toLowerCase()}/${resourceName.toLowerCase()}.interface';
import ${capitalizeFirstLetter(resourceName)}Model from '@/resources/${resourceName.toLowerCase()}/${resourceName.toLowerCase()}.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';
import slugify from 'slugify';

class ${capitalizeFirstLetter(resourceName)}Service {
  private ${resourceName} = ${capitalizeFirstLetter(resourceName)}Model;
}

export default ${capitalizeFirstLetter(resourceName)}Service;
`;
exports.serviceContent = serviceContent;
const validationContent = (resourceName) => `
import Joi from 'joi';

const create${capitalizeFirstLetter(resourceName)} = Joi.object({
});

const update${capitalizeFirstLetter(resourceName)} = Joi.object({
});

export default { create${capitalizeFirstLetter(resourceName)}, update${capitalizeFirstLetter(resourceName)} };
`;
exports.validationContent = validationContent;
