let logger = console.log;
const logs = [];

export function setLogger(newLogger: (message: string) => void) {
    logger = newLogger;
}

export function log(message: string) {
    logger(message);
    logs.push(message);
}

export function getSessionLogs() {
    const text = logs.join("\n") + "\n\n";
    logs.length = 0;
    return text;
}
