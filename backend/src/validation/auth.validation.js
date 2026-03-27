import Joi from "joi";

// Validation schema for user signup
export const signupSchemaValidation = Joi.object({
  fullName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  // profileImage: Joi.any().required(),
});

// Validation schema for user login
export const loginSchemaValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(2).max(10).required(),
});
