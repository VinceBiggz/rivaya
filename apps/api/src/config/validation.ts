import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Application Configuration
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3001),
  CORS_ORIGIN: Joi.string().required(), // Ensure this matches your .env.example
  CORS_CREDENTIALS: Joi.boolean().default(true),

  // Database Configuration
  DATABASE_URL: Joi.string().uri().required(),
  DATABASE_POOL_MIN: Joi.number().default(2),
  DATABASE_POOL_MAX: Joi.number().default(10),
  DATABASE_POOL_IDLE_TIMEOUT: Joi.number().default(30000),

  // Redis Configuration
  REDIS_URL: Joi.string().uri().required(),

  // JWT Configuration
  JWT_SECRET: Joi.string().min(32).required(), // Enforce a minimum length for security
  JWT_EXPIRES_IN: Joi.string().default('7d'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('30d'),

  // Security Configuration
  BCRYPT_ROUNDS: Joi.number().default(12),
  RATE_LIMIT_WINDOW: Joi.number().default(900000),
  RATE_LIMIT_MAX: Joi.number().default(100),

  // Feature Flags
  ENABLE_REGISTRATION: Joi.boolean().default(true),
  ENABLE_EMAIL_VERIFICATION: Joi.boolean().default(false),
  ENABLE_SOCIAL_LOGIN: Joi.boolean().default(false),
  ENABLE_FILE_UPLOADS: Joi.boolean().default(true),
  MAX_FILE_SIZE: Joi.number().default(5242880),
  UPLOAD_PATH: Joi.string().default('./uploads'),
  ALLOWED_FILE_TYPES: Joi.string().default('image/jpeg,image/png,image/gif,image/webp'),
});