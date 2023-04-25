import { Model } from '../types/Model';

type PriceInCredits = {
  input: number;
  output: number;
};

// 1 credit = $0.000002 OpenAI API spend
// $1 API spend = 500,000 credits
export const pricing: Record<Model, PriceInCredits> = {
  [Model.Gpt35Turbo]: {
    input: 1, // $0.002 per 1000 tokens
    output: 1, // $0.002 per 1000 tokens
  },
  [Model.Gpt4]: {
    input: 15, // $0.03 per 1000 tokens
    output: 30, // $0.06 per 1000 tokens
  },
  [Model.Gpt432k]: {
    input: 30, // $0.06 per 1000 tokens
    output: 60, // $0.12 per 1000 tokens
  },
};
