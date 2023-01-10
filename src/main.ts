import { bot } from ".";

import http from "serverless-http";

export const handler = http(bot.webhookCallback("/webhook"));
