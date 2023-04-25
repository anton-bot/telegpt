// Partition key is two first characters of chatId, not including the minus sign.
export function getUserPartitionKey(chatId: number) {
  return Math.abs(chatId).toString().slice(0, 2);
}
