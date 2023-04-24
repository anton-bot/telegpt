import { Command } from "../types/Command";
import { extractCommand } from "./extractCommand";

describe('extractCommand', () => {
    it('should return the command and text', () => {
        const text = '/start hello world';
        const result = extractCommand(text);
        expect(result).toEqual({
            command: Command.Start,
            text: 'hello world',
        });
    });

    it('should return the command and empty text if only command is provided', () => {
        const text = '/start';
        const result = extractCommand(text);
        expect(result).toEqual({
            command: Command.Start,
            text: '',
        });
    });

    it('should return the /text command if no command is provided', () => {
        const text = 'hello world';
        const result = extractCommand(text);
        expect(result).toEqual({
            command: Command.Text,
            text,
        });
    });

    it('should return the /text command if the command is invalid', () => {
        const text = '/invalid hello world';
        const result = extractCommand(text);
        expect(result).toEqual({
            command: Command.Text,
            text,
        });
    });
});
