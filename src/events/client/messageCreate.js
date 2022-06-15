const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const cooldown = new Map();

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (message.guild) {
    let prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    //

    //let commands = client.commands.get(message.commandName);

    //let commands = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    let commands = client.commands.get(cmd);
    if (!commands) commands = client.commands.get(client.aliases.get(cmd));
    if (commands) {
      if (!message.member.permissions.has(commands.permissions))
        return await message
          .reply({
            embeds: [new MessageEmbed().setDescription(`:x: **You do not have \`${commands.permissions}\` permission to use \`${prefix}${commands.name}\` command!**`).setColor(process.env.errorEmbedColor)],
          })
          .catch((e) => {
            console.log(e);
          });

      //

      if (!message.guild.me.permissions.has(commands.botPermissions))
        return await message
          .reply({
            embeds: [new MessageEmbed().setDescription(`:x: **I do not have \`${commands.botPermissions}\` permission to use \`${prefix}${commands.name}\` command!**`).setColor(process.env.errorEmbedColor)],
          })
          .catch((e) => {
            console.log(e);
          });

      //

      if (!cooldown.has(commands.name)) {
        cooldown.set(commands.name, new Collection());
      }

      const current_time = Date.now();
      const time_stamps = cooldown.get(commands.name);
      const cooldown_amount = commands.cooldown * 1000;

      if (time_stamps.has(message.author.id)) {
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
        if (current_time < expiration_time) {
          const time_left = (expiration_time - current_time) / 1000;
          return message.reply({
            embeds: [new MessageEmbed().setColor(process.env.errorEmbedColor).setDescription(`**Please wait \`${time_left.toFixed(1)} seconds\` between each cooldown**`)],
          });
        }
      }

      time_stamps.set(message.author.id, current_time);

      setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

      //
      if (commands.ownerOnly) {
        if (!message.author.id === owner)
          return await message
            .reply({
              embeds: [new MessageEmbed().setDescription(`:x: **You cannot use \`${prefix}${commands.name}\` command as this is a developer command.**`).setColor(process.env.errorEmbedColor)],
            })
            .then((msg) => {
              setTimeout(() => {
                msg.delete().catch((e) => {
                  console.log(e);
                });
              }, 3000);
            })
            .catch((e) => {
              console.log(e);
            });
      }
      commands.callbacks(client, message, args, prefix);
    }
  } else {
    let prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    //

    //let commands = client.commands.get(message.commandName);

    //let commands = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    let commands = client.commands.get(cmd);
    if (!commands) commands = client.commands.get(client.aliases.get(cmd));
    if (commands) {
      const no = client.emojis.cache.find((x) => x.id === emoji.no);

      if (!cooldown.has(commands.name)) {
        cooldown.set(commands.name, new Collection());
      }

      const current_time = Date.now();
      const time_stamps = cooldown.get(commands.name);
      const cooldown_amount = commands.cooldown * 1000;

      if (time_stamps.has(message.author.id)) {
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
        if (current_time < expiration_time) {
          const time_left = (expiration_time - current_time) / 1000;
          return message.reply({
            embeds: [new MessageEmbed().setColor(process.env.errorEmbedColor).setDescription(`**Please wait \`${time_left.toFixed(1)} seconds\` between each cooldown**`)],
          });
        }
      }

      time_stamps.set(message.author.id, current_time);

      setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

      //
      if (commands.ownerOnly) {
        if (!message.author.id === owner)
          return await message
            .reply({
              embeds: [new MessageEmbed().setDescription(`:x: **You cannot use \`${prefix}${commands.name}\` command as this is a developer command.**`).setColor(process.env.errorEmbedColor)],
            })
            .then((msg) => {
              setTimeout(() => {
                msg.delete().catch((e) => {
                  console.log(e);
                });
              }, 3000);
            })
            .catch((e) => {
              console.log(e);
            });
      }

      if (!commands.allowDM) {
        return await message.reply({
          embeds: [new MessageEmbed().setDescription(`:x: **This command is disabled in direct messages.**`).setColor(process.env.errorEmbedColor)],
        });
      }
      commands.callbacks(client, message, args, prefix);
    }
  }
};
