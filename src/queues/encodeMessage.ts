import { Message } from "../types/Message";

// Azure Queue Storage only accepts base64 encoded strings:
export function encodeMessage(message: Message): string {
    return base64encode(JSON.stringify(message));
}

function base64encode(str: string): string {
    return Buffer.from(str).toString('base64');
}
