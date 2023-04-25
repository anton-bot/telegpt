import { countTokens } from '../common/countTokens';
import { Model } from '../types/Model';
import { calculateSpentCredits } from './calculateSpentCredits';

describe('calculateSpentCredits', () => {
  it('should pass sanity check', () => {
    const tokens = countTokens('hello world');
    expect(calculateSpentCredits(Model.Gpt35Turbo, tokens, 'out')).toBe(3);
    expect(calculateSpentCredits(Model.Gpt4, tokens, 'in')).toBe(45);
  });

  it('should calculate spent credits for cheapest model', () => {
    expect(calculateSpentCredits(Model.Gpt35Turbo, 800, 'in')).toBe(800);
    expect(calculateSpentCredits(Model.Gpt35Turbo, 1555, 'out')).toBe(1555);
  });

  it('should calculate spent credits for default model', () => {
    expect(calculateSpentCredits(Model.Gpt4, 800, 'in')).toBe(12000);
    expect(calculateSpentCredits(Model.Gpt4, 1555, 'out')).toBe(46650);
  });
});
