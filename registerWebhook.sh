curl -X "POST" "https://api.telegram.org/bot<TELEGRAM BOT KEY>/deleteWebhook"

curl -X "POST" "https://api.telegram.org/bot<TELEGRAM BOT KEY>/setWebhook" \
    -d '{"url": "https://tele-gpt.azurewebsites.net/api/<FUNCTION NAME AND SECRET KEY>", "allowed_updates": ["message", "callback_query"]}' \
    -H 'Content-Type: application/json; charset=utf-8'
