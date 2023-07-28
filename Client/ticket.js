let { Channel } = require("../config.json")
let {EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require("discord.js")

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {

        const channel = Channel
        const msgsend = client.channels.cache.get(channel)
        const embed = new EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: `Ticket System`, iconURL: msgsend.guild.iconURL({ dynamic: true }) })
        .setDescription("Use the button below for support!")

         .setThumbnail(msgsend.guild.iconURL({ dynamic: true }) )
         .setFooter({ text: "Use button for support action", iconURL: msgsend.guild.iconURL({ dynamic: true })  })
        
        const row = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder()
        .setStyle(2)
        .setCustomId("support")
        .setEmoji("🎫")
        )
        msgsend.send({embeds: [embed], components:[row]}).then(console.log("Ticket Sent to Message Channel"))

   }};