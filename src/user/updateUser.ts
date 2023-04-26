import { TableClient } from '@azure/data-tables';
import { log } from '../common/log';
import { User } from '../types/User';
import { getUser } from './getUser';
import { sleep } from '../common/sleep';

const MAX_ATTEMPTS = 5;
const MAX_RANDOM_DELAY = 2000;

export async function updateUser(
  client: TableClient,
  originalUser: User,
  etag: string,
  update: (user: User) => User,
) {
  let attempts = 0;
  let user = originalUser;

  while (attempts < MAX_ATTEMPTS) {
    user = update(user);

    // To avoid overwriting credits or model if they were updated by another process,
    // use `etag` and refresh `user` if the update fails.
    try {
      return await client.updateEntity(user, 'Merge', { etag });
    } catch (e) {
      log(`Failed to save spent credits, retrying... ${e.message}`);
      attempts++;
      const randomDelay = Math.floor(Math.random() * MAX_RANDOM_DELAY);
      await sleep(randomDelay);
      ({ etag, user } = await getUser(client, Number(user.rowKey)));
    }
  }

  throw new Error(
    `Failed to update credits after ${MAX_ATTEMPTS} attempts: account ${user.rowKey}`,
  );
}
