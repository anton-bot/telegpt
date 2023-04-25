export enum Command {
  Start = '/start',
  AddBalance = '/addbalance',
  ChangeModel = '/model',
  ShowAccountDetails = '/account',
  Text = '/text', // Implied default command to just process a text message
}

const COMMANDS = Object.values(Command);

export function isValidCommand(command: string): command is Command {
  return COMMANDS.includes(command as Command);
}
