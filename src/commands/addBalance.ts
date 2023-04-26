import { getTableClient } from '../common/getTableClient';
import { CommandProcessor } from '../types/CommandProcessor';
import { Table } from '../types/Table';
import { getUser } from '../user/getUser';
import { updateUser } from '../user/updateUser';

export const addBalance: CommandProcessor = async (message, account, parsed) => {
  const [userId, amount] = parseUserAndAmount(parsed.text);
  if (!userId || !amount) {
    return {
      responseText: `Specify user ID and the amount of credits to add, like this: /addbalance 1234567 10000`,
    };
  }

  if (!account.isAdmin) {
    return {
      responseText: `You are not an admin.`,
    };
  }

  const client = getTableClient(Table.Users);
  const { user, etag } = await getUser(client, userId);
  await updateUser(client, user, etag, (user) => ({
    ...user,
    credits: user.credits + amount,
  }));

  return {
    responseText:
      `Added ${amount} credits to user ${userId}/${user.username ?? ''}. ` +
      `New balance: ${user.credits + amount}`,
  };
};

function parseUserAndAmount(text: string) {
  if (!text) {
    return [undefined, undefined];
  }

  const [userId, amount] = text
    .split(' ')
    .map((s) => s.trim())
    .map(Number);

  return [userId, amount];
}
