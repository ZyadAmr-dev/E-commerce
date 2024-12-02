import Joi from 'joi';

export const userSchema = Joi.object({
    fname: Joi.string()
        .required()
        .trim(), 
    lname: Joi.string()
        .required()
        .trim(), 
    email: Joi.string()
        .email()
        .required()
        .lowercase()
        .trim(), 
    password: Joi.string()
        // .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'email')
        .min(6) 
        .required()
        .messages({
            'string.pattern.name': 'this is invalid email'
        }),
    phone: Joi.string()
        .required()
        .trim(),
    address: Joi.object({
        street: Joi.string()
            .optional()
            .trim(),
        city: Joi.string()
            .optional()
            .trim(),
    }).optional(),
    role: Joi.string()
        .valid('customer', 'admin')
        .default('customer'), 
    isConfirmed: Joi.boolean()
        .default(false),
    subscribed: Joi.boolean()
        .default(false), 
});
