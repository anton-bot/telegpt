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
- display command list to user
- send a message when resetting conversation due to token limit
- save history in parallel
- how does chatId / messageId work for group chats?
- implement sort key (messageId + timestamp) for ordering user before assistant
- test multiple responses to the same message. Should bot cut off messages after the one being responded to? 
- use schema validation library
- secondary index on threadId
