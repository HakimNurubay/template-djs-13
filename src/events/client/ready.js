const { Client } = require("discord.js");
const Discord = require("discord.js");
const chalk = require("chalk");

/**
 *
 * @param {Client} client
 */

module.exports = async (client) => {
  client?.manager?.init(client.user.id);

  console.log(chalk.bold.white(`[Client] ${client.user.username} is Online!`));

  console.table({
    "Bot User:": `${client.user.tag}`,
    "Guild(s):": `${client.guilds.cache.size} Servers`,
    "Watching:": `${client.users.cache.size} Members`,
    "Discord.js:": `v${Discord.version}`,
    "Node.js:": `${process.version}`,
    "Plattform:": `${process.platform} ${process.arch}`,
    "Memory:": `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
  });

  client.user.setPresence({
    status: "online",
  });

  client.user.setActivity({
    name: `TEMPLATE DJS 13 by Хаким#8774`,
    type: "PLAYING",
  });
};
