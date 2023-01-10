import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import * as dotenv from "dotenv";
dotenv.config();

export const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.start(async (context) => {
  await context.reply(
    "Hi there. Send a web app URL to get started (e.g. https://m.vk.com, https://online.sberbank.ru)"
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
    await context.telegram.sendMessage(
      context.chat.id,
      "Please provide a valid HTTPS URL."
    );
  }
});

if (require.main === module) {
  bot.launch();
}
