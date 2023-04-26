import { Model } from './Model';
import { TableRow } from './TableRow';

export type User = TableRow & {
  username: string;
  gptModel: Model;
  credits: number;
  updatedAt: number;
  isAdmin: boolean;
  persona?: string;
};
