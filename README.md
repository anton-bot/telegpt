# telegpt
GPT as a service via a Telegram bot.

## Back-of-the-envelope architecture diagram ## 

```
                                                 ┌─────────────────┐
                                                 │                 │
                                ┌────────────────┤   User          ◄─────────┐
                                │                │                 │         │
                                │                └─────────────────┘         │
                                │                                            │
                                │                                            │
                                │                                            │
┌─────────────────┐      ┌──────▼───────────┐                          ┌─────┴──────────────┐
│                 │      │                  │                          │                    │
│   Balance chg   │      │  Process command │                          │    Sender          │
│                 │      │                  │                          │                    │
└─────────────────┘      └──────┬───────────┘                          └─────┬──────────────┘
                                │                                            │
                         ┌──────┴────────┐    ┌──────────────────────┐  ┌────┴──────────────┐
                         │               │    │                      │  │                   │
                  ┌──────┤    Queue      ├────┤    Processor         ├──┤    Queue          │
                  │      │               │    │                      │  │                   │
                  │      └───────────────┘    └─┬───────────┬────────┘  └───────────────────┘
                  │                             │           │
                  │          ┌──────────────────┴┐   ┌──────┴───────────────┐
                  │          │                   │   │                      │
                  │          │      GPT-4 API    │   │   Chat History       │
                  │          │                   │   │                      │
                  │          └───────────────────┘   └──────┬───────────────┘          ┌───────────────┐
                  │                                         │                          │               │
                  │                                  ┌──────┴───────────────┐          │               │
                  │                                  │                      │          │    Logs       │
                  │                                  │  User Settings       │          │               │
                  │                                  │                      │          └───────────────┘
                  │                                  └──────┬───────────────┘
                  │                                         │
                  │                                  ┌──────┴───────────────┐
                  │                                  │                      │
                  └──────────────────────────────────┤   Billing            │
                                                     │                      │
                                                     └──────────────────────┘
```

### To do list ###

- check what happens if Telegram splits long incoming messages
- send a message when resetting conversation due to token limit
- how does chatId / messageId work for group chats?
- test multiple responses to the same message. Should bot cut off messages after the one being responded to? 
- use schema validation library
- secondary index on threadId
- also save bot responses for /account and other such commands
- verify users with no username set can still use the bot
- check if spent credits are calculated correctly in groups
- group chats: respond only if spoken to directly

