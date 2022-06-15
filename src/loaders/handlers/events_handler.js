const { Client } = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const dir = "../../events/client";

/**
 *
 * @param {Client} client
 */

module.exports = (client) => {
  fs.readdirSync(path.join(__dirname, dir))
    .filter((files) => files.endsWith(".js"))
    .forEach((file) => {
      try {
        const events = require(path.join(__dirname, dir, file));
        const name = file.split(".")[0];

        client.on(name, events.bind(null, client));
        console.log(chalk.bold.cyan(`[Events] "${file}"`));
      } catch (err) {
        console.log(`[Events] "${file}"`);
        console.log(chalk.red(err));
      }
    });
};
