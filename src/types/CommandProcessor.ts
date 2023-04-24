import { User } from "../tables/user";
import { IncomingMessage } from "./IncomingMessage";
import { ParsedCommand } from "./ParsedCommand";

export type CommandProcessorResult = {
    responseText: string;
};

export type CommandProcessor = (
    message: IncomingMessage,
    user: User,
    command: ParsedCommand,
) => Promise<CommandProcessorResult>;
