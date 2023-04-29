import { getTelegramToken } from './getTelegramToken';

describe('getTelegramToken()', () => {
  beforeAll(() => {
    process.env.TELEGRAM_TOKEN = '123456:default-token';
  });

  it('must return the default token when no chatId is provided', () => {
    expect(getTelegramToken()).toBe('123456:default-token');
  });

  it('must return the default token when no overrides are provided', () => {
    expect(getTelegramToken(555555)).toBe('123456:default-token');
  });

  it('must return the default token when the chatId is not overridden', () => {
    process.env.TELEGRAM_TOKEN_OVERRIDES = JSON.stringify({
      '555555': '99999:overridden-token',
    });
    expect(getTelegramToken(111111)).toBe('123456:default-token');
  });

  it('must return the overridden token when the chatId is overridden', () => {
    expect(getTelegramToken(555555)).toBe('99999:overridden-token');
  });

  afterAll(() => {
    delete process.env.TELEGRAM_TOKEN;
  });
});
