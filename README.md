# Open webapp bot

## Setup

- volta
- nodejs
- telegraf framework
- serverless framework
- yandex cloud serverless plugin

```sh
volta install node
pnpm install

# Start development server
pnpm dev
```

## Deploy

```sh
pnpm build
pnpm serverless:deploy
pnpm serverless:info
pnpm webhook:set

# or just run

pnpm release
```

Clear resource and reset

```sh
pnpm purge
pnpm webhook:remove
```
