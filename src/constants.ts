import { Model } from "./types/Model";

// Credits given to new users.
export const DEFAULT_CREDITS = 3000;

// Model selected automatically for new users.
export const DEFAULT_GPT_MODEL = Model.Gpt4;

// Some models support even smaller input, like 8Kb
export const HARD_MESSAGE_LIMIT = 32 * 1024;

// 4 English characters is approximately 1 token
export const CHARS_TO_TOKENS_RATIO_APPROX = 0.25;

// Check environment variables;
if (!process.env.AZURE_STORAGE_CONNECTION_STRING) {
    throw new Error("Missing AZURE_STORAGE_CONNECTION_STRING environment variable");
}

if (!process.env.TELEGRAM_TOKEN) {
    throw new Error("Missing TELEGRAM_TOKEN environment variable");
}

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY environment variable");
}
