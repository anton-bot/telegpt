import { getTableClient } from '../common/getTableClient';
import { CommandProcessor } from '../types/CommandProcessor';
import { Table } from '../types/Table';
import { updateUser } from '../user/updateUser';

const PERSONA_HELP_TEXT = `A persona is how the AI sees itself, for example:\n\n/persona You are a helpful bot that talks like Abraham Lincoln. Answer all queries from the perspective of a 19th century American president. Begin each of your answers with the phrase 'Always bear this in mind:'`;

export const setPersona: CommandProcessor = async (message, account, parsed, etag) => {
  const client = getTableClient(Table.Users);

  if (parsed.text) {
    await updateUser(client, account, etag, (user) => ({
      ...user,
      persona: parsed.text,
    }));
    return {
      responseText: `Persona saved. To delete it, send /persona without any text.`,
    };
  }

  if (account.persona) {
    await updateUser(client, account, etag, (user) => ({
      ...user,
      persona: '',
    }));
    return {
      responseText:
        `Persona deleted. To set a new persona, send /persona with some text.\n\n` +
        PERSONA_HELP_TEXT,
    };
  }

  return {
    responseText: `To set a persona, send /persona with some text.\n\n` + PERSONA_HELP_TEXT,
  };
};
