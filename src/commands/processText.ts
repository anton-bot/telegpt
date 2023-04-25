import { getChatCompletion } from "../api/getChatCompletion";
import { calculateSpentCredits } from "../billing/calculateSpentCredits";
import { countTokens } from "../common/countTokens";
import { getTableClient } from "../common/getTableClient";
import { getMessageHistory } from "../history/getMessageHistory";
import { createHistory } from "../history/createHistory";
import { CommandProcessor } from "../types/CommandProcessor";
import { HistoryMessage } from "../types/HistoryMessage";
import { getTokenLimit } from "../types/Model";
import { OpenAiMessage } from "../types/OpenAiMessage";
import { Table } from "../types/Table";
import { saveMessage } from "../history/saveMessage";
import { log } from "../common/log";

export const processText: CommandProcessor = async (message, account) => {
    if (account.credits <= 0) {
        return {
            responseText: "You have no credits left. Please purchase more credits to continue using this service.",
        };
    }

    const model = account.gptModel;
    const client = getTableClient(Table.History);
    const isFirstMessageInThread = !message.replyTo;
    const history = isFirstMessageInThread
        ? []
        : await getMessageHistory(client, message.chatId, message.replyTo);

    const totalTokens = countTokens(history) + countTokens(message.text);
    const isOverTokenLimit = totalTokens >= getTokenLimit(model);
    const prevMessages = isOverTokenLimit
        ? []
        :  history.sort(byTimestampAscending).map(toOpenAiHistoryFormat);

    const { responseText, promptTokens, responseTokens } = await getChatCompletion(
        model,
        message.text,
        prevMessages,
    );

    const [promptCredits, responseCredits] = [calculateSpentCredits(model, promptTokens), calculateSpentCredits(model, responseTokens)];
    
    const threadId = (isOverTokenLimit || isFirstMessageInThread)
        ? message.messageId
        : history[0]?.threadId ?? -1;

    const { userMessage, botMessage } =  createHistory({
        message,
        threadId,
        promptTokens,
        responseTokens,
        promptCredits,
        responseCredits,
        responseText,
    });

    await saveMessage(client, userMessage);

    // TODO: save billing

    log(`${prevMessages.length} messages in thread ${threadId}, first at ${history[0]?.timestamp}. ${promptTokens}/${responseTokens} tokens spent.`);

    return {
        responseText,
        botMessage,
    };
};

const byTimestampAscending = (a: HistoryMessage, b: HistoryMessage) => a.timestamp - b.timestamp;

const toOpenAiHistoryFormat = (message: HistoryMessage): OpenAiMessage => ({
    role: message.role,
    content: message.text,
});
