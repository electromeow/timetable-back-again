import discord from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import DatabaseHelper from "./database.js";
dotenv.config();

const bot = new discord.Client({
  intents: [
    discord.Intents.FLAGS.GUILD_MESSAGES,
    discord.Intents.FLAGS.GUILDS,
  ]
})
bot.commands = {};
bot.replyWithEmbed = (msg, embed) => msg.reply({ embeds: [embed] });

eval(fs.readFileSync("./events.js").toString());
const commandFiles = fs.readdirSync("./commands");
for(const commandFile of commandFiles) {
  bot.commands[commandFile.replace(".js", "")] = await import("./commands/"+commandFile).default;
}

(async function(){
  bot.db = new DatabaseHelper(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_DATABASE, process.env.DB_PORT);
  await bot.db.pool.query("SELECT NOW()");
  bot.login(process.env.DISCORD_TOKEN);
})();
