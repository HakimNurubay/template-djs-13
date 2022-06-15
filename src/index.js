console.clear();
const { Client, Collection, Intents } = require("discord.js");
const chalk = require("chalk");
require("dotenv").config();

console.log(chalk.bold.white("[==========Running Project==========]"));

const client = new Client({
  intents: new Intents(32767),
  partials: ["MESSAGE", "CHANNEL", "USER", "REACTION"],
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },
  shards: "auto",
  restTimeOffset: 0,
});

//load the loader
require("./loaders/loader")(client);

module.exports = client;

//login to client
client.login(process.env.client_token);
