import { pricing } from './pricing';

describe('Pricing', () => {
  it('none of the prices should be zero or negative', () => {
    for (const model in pricing) {
      expect(pricing[model].input).toBeGreaterThan(0);
      expect(pricing[model].output).toBeGreaterThan(0);
    }
  });
});
