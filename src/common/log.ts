let logger = console.log;
const logs = [];

export function setLogger(newLogger: (message: string) => void) {
    logger = newLogger;
}

export function log(message: string) {
    logger(message);

    if (process.env.ENABLE_DEBUG_LOGGING) {
        logs.push(message);
    }
}

export function getSessionLogs() {
    if (!process.env.ENABLE_DEBUG_LOGGING) {
        logs.length = 0;
        return "";
    }

    const text = logs.join("\n") + "\n\n";
    logs.length = 0;
    return text;
}
