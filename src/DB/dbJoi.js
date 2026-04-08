import Joi from 'joi';
import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const usersSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    age: Joi.number().required()
  })
)
const currentYear = new Date().getFullYear();

const engineJoiSchema = Joi.object({
  type: Joi.string()
    .valid('petrol', 'diesel', 'electric', 'hybrid')
    .required(),
  volume_l: Joi.number().min(0).required(),
  power_hp: Joi.number().min(0).required(),
}).required();

export const createCarSchema = Joi.object({
  _id: Joi.string()
    .pattern(/^[a-z0-9]+(?:_[a-z0-9]+)*$/i) // toyota_camry_2020
    .required(),
  brand: Joi.string().trim().min(1).required(),
  model: Joi.string().trim().min(1).required(),
  year: Joi.number()
    .integer()
    .min(1950)
    .max(currentYear + 1)
    .required(),
  price_usd: Joi.number().min(0).required(),
  mileage_km: Joi.number().min(0).required(),
  engine: engineJoiSchema,
  transmission: Joi.string()
    .valid('manual', 'automatic', 'cvt', 'robot')
    .required(),
  drivetrain: Joi.string()
    .valid('fwd', 'rwd', 'awd', '4wd')
    .required(),
  body_type: Joi.string()
    .valid('sedan', 'hatchback', 'wagon', 'suv', 'coupe', 'convertible', 'pickup', 'van')
    .required(),
  color: Joi.string().trim().min(1).required(),
  features: Joi.array().items(Joi.string().trim().min(1)).default([]),
  in_stock: Joi.boolean().default(true),
  photo: Joi.string(), 
  parentId: Joi.string().custom((value, helper) => {
    if(value && !isValidObjectId(value)) {
      return helper.message('Parent id should be a valid mongo id')
    }
    return true
  })
}).options({ abortEarly: false, stripUnknown: true })
;

export const updateCarSchema = Joi.object({
  brand: Joi.string().trim().min(1),
  model: Joi.string().trim().min(1),

  year: Joi.number().integer().min(1950).max(currentYear + 1),

  price_usd: Joi.number().min(0),
  mileage_km: Joi.number().min(0),

  engine: Joi.object({
    type: Joi.string().valid('petrol', 'diesel', 'electric', 'hybrid'),
    volume_l: Joi.number().min(0),
    power_hp: Joi.number().min(0),
  }),

  transmission: Joi.string().valid('manual', 'automatic', 'cvt', 'robot'),
  drivetrain: Joi.string().valid('fwd', 'rwd', 'awd', '4wd'),
  body_type: Joi.string().valid('sedan', 'hatchback', 'wagon', 'suv', 'coupe', 'convertible', 'pickup', 'van'),

  color: Joi.string().trim().min(1),

  features: Joi.array().items(Joi.string().trim().min(1)),

  in_stock: Joi.boolean(),
})
  .min(1)
  .options({ abortEarly: false, stripUnknown: true });
