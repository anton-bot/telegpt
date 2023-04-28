import { TableClient } from '@azure/data-tables';
import { saveSpentCredits } from './saveSpentCredits';
import { Model } from '../types/Model';
import { User } from '../types/User';

describe('saveSpentCredits()', () => {
  it('should reduce the user credits by the spent credits', async () => {
    const user: User = {
      partitionKey: '11',
      rowKey: '1122345',
      timestamp: Date.now(),
      updatedAt: Date.now() - 10000000,
      username: 'test',
      gptModel: Model.Gpt35Turbo,
      isAdmin: false,
      credits: 100000,
    };
    const client = {
      updateEntity: jest.fn(),
    };
    const etag = 'etag';
    const spentCredits = 999;
    await saveSpentCredits(client as unknown as TableClient, user, spentCredits, etag);
    expect(client.updateEntity).toHaveBeenCalledWith(
      {
        ...user,
        credits: user.credits - spentCredits,
      },
      'Merge',
      { etag },
    );
    expect(client.updateEntity).toHaveBeenCalledTimes(1);
  });
});
