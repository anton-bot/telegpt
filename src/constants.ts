import { Model } from './types/Model';

// Credits given to new users.
export const DEFAULT_CREDITS = 100000; // 100k credits = $0.20 API spend

// Model selected automatically for new users.
export const DEFAULT_GPT_MODEL = Model.Gpt35Turbo;

// Some models support even smaller input, like 8Kb
export const HARD_MESSAGE_LIMIT = 32 * 1024;

// 4 English characters is approximately 1 token
export const CHARS_TO_TOKENS_RATIO_APPROX = 0.25;

export const ENABLE_DEBUG_LOGGING = process.env.ENABLE_DEBUG_LOGGING;

// Check environment variables;
const ENV_VARIABLES = ['AZURE_STORAGE_CONNECTION_STRING', 'TELEGRAM_TOKEN', 'OPENAI_API_KEY'];

for (const variable of ENV_VARIABLES) {
  if (!process.env[variable]) {
    throw new Error(`Missing ${variable} environment variable`);
  }
}
