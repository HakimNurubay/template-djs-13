const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["latency"],
  usage: "",
  description: "Gives you information on how fast the Bot can respond to you.",
  category: "info",
  cooldown: 5,
  permissions: "",
  botPermissions: "",
  allowDM: true,
  ownerOnly: false,

  /**
   * @param {Client} client
   * @param {Message} message
   */

  callbacks: async (client, message) => {
    let time = Date.now();

    message
      .reply({
        embeds: [new MessageEmbed().setColor(process.env.defEmbedColor).setDescription(`**Calculating ping...**`)],
      })
      .then((msg) => {
        msg.edit({
          embeds: [
            new MessageEmbed()
              .setColor(process.env.defEmbedColor)
              .setAuthor("🏓 Pong!", client.user.displayAvatarURL({ dynamic: true }))
              .addField("**Client Latency**", `**\`\`\`ini\n   [ ${Date.now() - time}ms ]   \`\`\`**`, true)
              .addField("**API Latency**", `**\`\`\`ini\n   [ ${client.ws.ping}ms ]   \`\`\`**`, true),
          ],
        });
      })
      .catch(() => {});
  },
};
