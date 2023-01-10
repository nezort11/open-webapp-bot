# Open Web app bot

```sh
nvm use
yarn

# Start development server
yarn dev

# Deploy to production
yarn deploy
yarn serverless info
yarn set-webhook -- -t 'BOT_TOKEN' -D '{ "url": "API_GATE_URL/webhook" }'

# Clear resource and reset
yarn purge
yarn set-webhook -- -t 'BOT_TOKEN' -D '{ "url": "" }'
```
