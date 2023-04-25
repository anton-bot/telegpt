export enum Model {
    Gpt4 = "gpt-4",
    Gpt432k = "gpt-4-32k",
    Gpt35Turbo = "gpt-3.5-turbo",
}

// Limits are slightly lower than the real number,
// since we don't have the exact number of tokens for the user's latest message.
export const getTokenLimit = (model: Model) => {
    switch (model) {
        case Model.Gpt4:
            return 4000;
        case Model.Gpt432k:
            return 32000;
        case Model.Gpt35Turbo:
            return 4000;
    }
}
