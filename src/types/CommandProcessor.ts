import { User } from "./User";
import { IncomingMessage } from "./IncomingMessage";
import { ParsedCommand } from "./ParsedCommand";
import { HistoryMessage } from "./HistoryMessage";

export type CommandProcessorResult = {
    responseText: string;
    botMessage?: HistoryMessage;
};

export type CommandProcessor = (
    message: IncomingMessage,
    user: User,
    command: ParsedCommand,
) => Promise<CommandProcessorResult>;
