# telegpt
GPT as a service via a Telegram bot.

## Try it out ##

Talk to [@gptlink_bot](https://t.me/gptlink_bot) on Telegram.

## Bot ommands ## 

Just send a message to the bot to talk. To continue the conversation, use the "reply" feature in Telegram (swipe on the bot's message).

- `/account` - View account balance
- `/model` - Select GPT model version
- `/persona` - Change bot's personality
- `/start` - Show help

### To do list ###

- check what happens if Telegram splits long incoming messages
- notify user when resetting conversation due to token limit
- test multiple responses to the same message. Should bot cut off messages after the one being responded to? 
- use schema validation library like zod
- enable secondary index on threadId
- also save bot responses to database for /account and other such commands
- verify users with no username set can still use the bot
- check if spent credits are calculated correctly in group chats
- group chats: respond only if bot is mentioned or replied to
