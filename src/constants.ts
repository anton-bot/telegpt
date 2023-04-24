// Credits given to new users.
export const DEFAULT_CREDITS = 3000;

// Model selected automatically for new users.
export const DEFAULT_GPT_MODEL = 'gpt-4';

export const DEFAULT_PARTITION_KEY = 'telegpt';

// Some models support even smaller input, like 8Kb
export const HARD_MESSAGE_LIMIT = 32 * 1024;


// Check environment variables;
if (!process.env.AZURE_STORAGE_CONNECTION_STRING) {
    throw new Error("Missing AZURE_STORAGE_CONNECTION_STRING environment variable");
}
