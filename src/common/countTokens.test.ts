import { HistoryMessage } from '../types/HistoryMessage';
import { countTokens } from './countTokens';

describe('Token counter', () => {
  it('should count approximate number of tokens in a string', () => {
    expect(countTokens('Hello, World!')).toBe(4);
  });

  it('should count exact number of tokens in an array of existing messages from database', () => {
    const messages = [
      { text: 'Hello, World!', tokens: 999 },
      { text: 'Hello, World 2!', tokens: 999 },
    ];
    expect(countTokens(messages as HistoryMessage[])).toBe(999 + 999);
  });
});
