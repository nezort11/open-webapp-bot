import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { BOT_TOKEN } from "./env";

export const bot = new Telegraf(BOT_TOKEN, {
  // REQUIRED for `sendChatAction` to work in serverless/webhook environment https://github.com/telegraf/telegraf/issues/1047
  telegram: { webhookReply: false },
});

bot.use(async (context, next) => {
  await context.persistentChatAction("typing", async () => {
    await next();
  });
});

bot.start(async (context) => {
  await context.reply(
    "Hi there it is Miniapp-er. Send a link to get started (e.g. https://m.vk.com, https://online.sberbank.ru)"
  );
});

bot.on(message("text"), async (context) => {
  try {
    const url = new URL(context.message.text);

    await context.reply(url.href, {
      reply_markup: {
        inline_keyboard: [[{ text: "Open", web_app: { url: url.href } }]],
      },
    });
  } catch (error) {
    console.error(error);
    await context.telegram.sendMessage(
      context.chat.id,
      "Please provide a valid HTTPS URL."
    );
  }
});
