// validator.ts
import Ajv from 'ajv';
import {
  localeSchema,
  secretSchema,
  pushMessageSchema,
  successResponseSchema,
  errorResponseSchema
} from './schemas';

const ajv = new Ajv();

// Валидаторы для push-сообщений
export const validateLocale = ajv.compile(localeSchema);
export const validateSecret = ajv.compile(secretSchema);
export const validatePushMessage = ajv.compile(pushMessageSchema);

// Валидаторы для ответов на регистрацию
export const validateSuccessResponse = ajv.compile(successResponseSchema);
export const validateErrorResponse = ajv.compile(errorResponseSchema);
