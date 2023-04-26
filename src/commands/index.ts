import { Command } from '../types/Command';
import { CommandProcessor } from '../types/CommandProcessor';
import { addBalance } from './addBalance';
import { changeModel } from './changeModel';
import { processText } from './processText';
import { setPersona } from './setPersona';
import { showAccountDetails } from './showAccountDetails';
import { showHelp } from './showHelp';

export const commands: Record<Command, CommandProcessor> = {
  [Command.Text]: processText,
  [Command.Start]: showHelp,
  [Command.ChangeModel]: changeModel,
  [Command.AddBalance]: addBalance,
  [Command.ShowAccountDetails]: showAccountDetails,
  [Command.SetPersona]: setPersona,
};
