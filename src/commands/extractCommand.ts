import { Command, isValidCommand } from "../types/Command";

export const COMMAND_REGEX = /^(\/[a-z]+)(?:@botname)?(?:\s|$)(.*)/i;

type ParsedCommand = {
    command: Command;
    text: string;
};

export function extractCommand(text: string): ParsedCommand {
    const matches = text.match(COMMAND_REGEX);
    if (matches) {
        const command = matches[1];
        if (isValidCommand(command)) {
            return {
                command,
                text: matches[2] ?? "",
            };
        }
    }

    return {
        command: Command.Text,
        text,
    };
}
