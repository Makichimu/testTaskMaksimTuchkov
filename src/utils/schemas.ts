// schemas.ts

// Схема для push-сообщения типа locale
export const localeSchema = {
    type: 'object',
    properties: {
      type: { const: 'locale' },
      data: { const: 'en' }
    },
    required: ['type', 'data'],
    additionalProperties: false
  };
  
  // Схема для push-сообщения с secret_key
  export const secretSchema = {
    type: 'object',
    properties: {
      secret_key: { type: 'string', minLength: 1 }
    },
    required: ['secret_key'],
    additionalProperties: false
  };
  
  // Общая схема для push-сообщений (BackendPushMessage)
  // data может быть строкой или числом
  export const pushMessageSchema = {
    type: 'object',
    properties: {
      type: { type: 'string' },
      data: {
        oneOf: [
          { type: 'string' },
          { type: 'number' }
        ]
      }
    },
    required: ['type', 'data'],
    additionalProperties: false
  };
  
  // Схема для успешного ответа от backend (BackendSuccessResponse)
  export const successResponseSchema = {
    type: 'object',
    properties: {
      success: { type: 'boolean', const: true },
      message: { type: 'string' }
    },
    required: ['success', 'message'],
    additionalProperties: false
  };
  
  // Схема для ошибки от backend (BackendErrorResponse)
  export const errorResponseSchema = {
    type: 'object',
    properties: {
      success: { type: 'boolean', const: false },
      error: { type: 'string' }
    },
    required: ['success', 'error'],
    additionalProperties: false
  };
  