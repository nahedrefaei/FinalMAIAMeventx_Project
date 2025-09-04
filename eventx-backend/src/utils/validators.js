import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().min(10).max(120).optional(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  interests: Joi.array().items(Joi.string()).optional(),
  location: Joi.string().optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const eventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  date: Joi.date().iso().greater('now').required(),
  venue: Joi.string().required(),
  price: Joi.number().min(0).required(),
  totalSeats: Joi.number().integer().min(1).required(),
  status: Joi.string().valid('draft','published','closed').optional()
});

export const bookingSchema = Joi.object({
  eventId: Joi.string().hex().length(24).required(),
  seats: Joi.array().items(Joi.string()).min(1).required(),
  paymentMethod: Joi.string().valid('card','cash','wallet').default('card')
});
