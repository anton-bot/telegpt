import { MessageRole } from "./MessageRole"

export type OpenAiMessage = {
    role: MessageRole;
    content: string;
};
