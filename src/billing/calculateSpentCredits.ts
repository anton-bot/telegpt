import { Model } from '../types/Model';
import { pricing } from './pricing';

export function calculateSpentCredits(
  model: Model,
  tokens: number,
  direction: 'in' | 'out',
): number {
  const spentCredits = pricing[model][direction === 'in' ? 'input' : 'output'] * tokens;
  if (spentCredits < 0) {
    throw new Error(`Spent credits cannot be negative: ${spentCredits}`);
  }

  return spentCredits;
}
