# video-translate-backend

- volta
- nodejs
- telegraf framework
- serverless framework
- serverless-http
- yandex-cloud-serverless-plugin

## Setup

- install [volta](https://docs.volta.sh/guide/getting-started)

- install [yc cli](https://yandex.cloud/ru/docs/cli/quickstart)

```sh
git clone https://github.com/nezort11/telegraf-serverless-yandex-cloud-template.git your-project-name
rm -rf ./your-project-name/.git

volta install node@18
pnpm install

# Start development server
pnpm dev
```

## Deploy

```sh
pnpm release

# or

pnpm build
pnpm serverless:deploy
pnpm serverless:info
pnpm webhook:set
```

Clear resource and reset

```sh
pnpm purge
pnpm webhook:remove
```
