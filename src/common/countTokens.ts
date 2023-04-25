import { CHARS_TO_TOKENS_RATIO_APPROX } from "../constants";
import { HistoryMessage } from "../types/HistoryMessage";

export function countTokens(msg: HistoryMessage[] | string) {
    if (typeof msg === "string") {
        return Math.ceil(msg.length * CHARS_TO_TOKENS_RATIO_APPROX);
    }

    return msg.reduce((total, msg) => total + msg.tokens, 0);
}
