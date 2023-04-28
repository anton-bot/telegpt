import { answerCallbackQuery } from './answerCallbackQuery';

describe('answerCallbackQuery()', () => {
  it('should confirm callback query by calling Telegram API', async () => {
    const fetch = jest.fn();
    global.fetch = fetch;
    const json = jest.fn();
    const response = { json };
    fetch.mockResolvedValue(response);
    const mockBotToken = '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11';
    await answerCallbackQuery(mockBotToken, '1234567');
    expect(fetch).toHaveBeenCalledWith(
      `https://api.telegram.org/bot${mockBotToken}/answerCallbackQuery`,
      {
        method: 'POST',
        body: JSON.stringify({
          callback_query_id: '1234567',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
});
