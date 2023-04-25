import { HistoryMessage, isHistoryMessage } from "./HistoryMessage";
import { OutgoingMessage, isOutgoingMessage } from "./OutgoingMessage";

export type OutgoingQueueItem = {
    response: OutgoingMessage;
    botMessage: HistoryMessage;
};

export function isOutgoingQueueItem(obj: unknown): obj is OutgoingQueueItem {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    return 'response' in obj
        && 'botMessage' in obj
        && isOutgoingMessage(obj.response)
        && isHistoryMessage(obj.botMessage);
}
