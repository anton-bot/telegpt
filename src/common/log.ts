import { ENABLE_DEBUG_LOGGING } from '../constants';

let logger = console.log;
const logs = [];

const MAX_LOG_LENGTH = 10 * 1024; // due to Azure Queue limit of 64Kb per message

export function setLogger(newLogger: (message: string) => void) {
  logger = newLogger;
}

export function log(message: string) {
  logger(message);

  if (ENABLE_DEBUG_LOGGING) {
    logs.push(message);
  }
}

export function getSessionLogs() {
  if (!ENABLE_DEBUG_LOGGING) {
    logs.length = 0;
    return '';
  }

  const text = logs.join('\n').slice(0, MAX_LOG_LENGTH);
  logs.length = 0;
  return text.trim() ? text + '\n\n' : '';
}
