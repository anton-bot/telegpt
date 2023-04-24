import { Command } from "../types/Command";
import { CommandProcessor } from "../types/CommandProcessor";
import { showAccountDetails } from "./showAccountDetails";

const noop: CommandProcessor = () => Promise.resolve({ responseText: "TODO" });

export const commands: Record<Command, CommandProcessor> = {
    [Command.Text]: noop,
    [Command.Start]: noop,
    [Command.AddBalance]: noop,
    [Command.ShowAccountDetails]: showAccountDetails,
};
