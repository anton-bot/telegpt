import { Configuration, OpenAIApi } from 'openai';
import { Model } from '../types/Model';
import { OpenAiMessage } from '../types/OpenAiMessage';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function getChatCompletion(model: Model, message: string, history: OpenAiMessage[]) {
  const completion = await openai.createChatCompletion({
    model,
    messages: [...history, { role: 'user', content: message }],
  });

  return {
    responseText: completion?.data?.choices?.[0]?.message?.content ?? '',
    promptTokens: completion?.data?.usage?.prompt_tokens ?? 0,
    responseTokens: completion?.data?.usage?.completion_tokens ?? 0,
  };
}
