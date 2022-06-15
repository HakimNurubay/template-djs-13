const { Client, Collection } = require("discord.js");
const { Perms } = require("../../validator/permissions");
const { promisify } = require("util");
const { glob } = require("glob");
const chalk = require("chalk");
const PG = promisify(glob);

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  try {
    client.commands = new Collection();
    client.aliases = new Collection();

    let amount = 0;
    const cmd = await PG(`${process.cwd()}/src/commands/**/*.js`);
    cmd.map(async (file) => {
      const command = require(file);
      if (command.name) {
        client.commands.set(command.name, command);
        amount++;
      } else {
        await console.log(chalk.bold.redBright(`Command Error: ${command.name || "Missing Name"} | Directory: ${file.split("/")[7] + `/` + file.split("/")[8]}`));
        return;
      }
      if (command.permissions) {
        if (!Perms.includes(command.permissions)) return await console.log(chalk.bold.redBright(`Command Error: Invalid Permission | Directory: ${file.split("/")[7] + `/` + file.split("/")[8]}`));
      }
      if (command.botPermissions) {
        if (!Perms.includes(command.botPermissions)) return await console.log(chalk.bold.redBright(`Command Error: Invalid Permission | Directory: ${file.split("/")[7] + `/` + file.split("/")[8]}`));
      }
      if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
    });
    await console.log(chalk.bold.greenBright(`${amount} Commands Loaded`));
  } catch (e) {
    console.log(chalk.red(e));
  }
};
