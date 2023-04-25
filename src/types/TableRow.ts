export type TableRow = {
  partitionKey: string;
  rowKey: string;
  timestamp: number; // TODO: Is it a number though? or is it a Date
};
