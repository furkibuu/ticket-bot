let { GatewayIntentBits , Client , Collection, InteractionType ,ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder,TextInputStyle, ButtonBuilder, ChannelType, PermissionsBitField} = require("discord.js")
let { readdirSync } = require("fs")
let IncludedIntents = Object.entries(GatewayIntentBits).reduce((t, [, V]) => t | V, 0)
let client = new Client({ intents: IncludedIntents })
let {Token, log, roleStaff } = require("./config.json")
let db = require("croxydb")

client.login(Token).then(console.log("Token Connected")).catch((err) => {consle.log("Failed to connect token")})



let eventFiles = readdirSync('./Client').filter(file => file.endsWith('.js'));

for (let file of eventFiles) {
	let event = require(`./Client/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}



const modal = new ModalBuilder()
	.setCustomId('form')
	.setTitle('Ticket System | Anju Development')
	  const a1 = new TextInputBuilder()
	  .setCustomId("reason")
	  .setLabel('Ticket your reason for opening')
	  .setStyle(TextInputStyle.Paragraph) 
	
	  .setMinLength(2)
	  .setPlaceholder('What is your reason for creating Ticket?')
	  .setRequired(true)
	  const row = new ActionRowBuilder().addComponents(a1);
	  
	  modal.addComponents(row);
	client.on('interactionCreate', async (interaction) => {
	
	  if(interaction.customId === "support"){
		await interaction.showModal(modal);
	  }
	})  


    const mod = new ModalBuilder()
	.setCustomId('addmenu1')
	.setTitle('Ticket System!')
	  const e = new TextInputBuilder()
	  .setCustomId('uyeid')
	  .setLabel('User ID')
	  .setStyle(TextInputStyle.Paragraph) 
	  .setMinLength(10)
	  .setPlaceholder('Enter the user ID you want to add.')
	  .setRequired(true)
	  const row2 = new ActionRowBuilder().addComponents(e);
	  
	  mod.addComponents(row2);
	client.on('interactionCreate', async (interaction) => {
	
	  if(interaction.customId === "add"){
		await interaction.showModal(mod);
	  }
	})  
	
	const mod2 = new ModalBuilder()
	.setCustomId('addmenu2')
	.setTitle(' Ticket System!')
	  const a = new TextInputBuilder()
	  .setCustomId('interestid')
	  .setLabel('User ID')
	  .setStyle(TextInputStyle.Paragraph) 
	  .setMinLength(10)
	  .setPlaceholder('Enter the user ID you want to remove.')
	  .setRequired(true)
	  const row3 = new ActionRowBuilder().addComponents(a);
	  
	  mod2.addComponents(row3);
	client.on('interactionCreate', async (interaction) => {
	
	  if(interaction.customId === "interest"){
		await interaction.showModal(mod2);
	  }
	})  

    client.on('interactionCreate', async interaction => {
        if (interaction.type !== InteractionType.ModalSubmit) return;
        if (interaction.customId === 'form') {
          const Reason = interaction.fields.getTextInputValue("reason")
        
      const row = new ActionRowBuilder()
      .addComponents( 
        new StringSelectMenuBuilder()
        .setCustomId('del')
      .setPlaceholder('Ticket Menu!')
      .addOptions([
      {
      label: 'Ticket Delete',
      description: 'Channels Delete!',
      emoji: "🗑",
      value: 'delete',
      },
      {
      label: "Panel",
      description: "Adding and Removing Members Menu.",
      emoji: "👤",
      value: "panel"
      
     },
]))

      
      let data = db.get(`ticket_${interaction.guild.id}`) || +1
      let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)
				  if (DejaUnChannel) return interaction.reply({content: '**You already have an open ticket on the server.**', ephemeral: true})
				  interaction.guild.channels.create({
				  name: `ticket-${interaction.user.username}-${data}`,
					type: ChannelType.GuildText,
			
					permissionOverwrites: [
					  {   
						  id: interaction.guild.id,
						  deny: [PermissionsBitField.Flags.ViewChannel]
					  },
					  {
						  id: interaction.user.id,
						  allow: [PermissionsBitField.Flags.ViewChannel]
					  },
					  {
						  id: roleStaff,
						  allow: [PermissionsBitField.Flags.ViewChannel]
					  }
				  ]
				})
				
					  
					  .then((c)=>{
					 
						  const i1 = new EmbedBuilder()
						  .setTitle('Ticket System')
						  .setDescription(`**User Created Support Request** \`${Reason}\` **Reason!**\n\n <:h_furki:1021079659779198996> **Supported By:** ${interaction.user}`)
						  .setColor("Gold")
						  c.send({embeds: [i1], content: `<@&${roleStaff}> | ${interaction.user}`, components: [row]})
						  interaction.reply({content: `Your ticket has been successfully opened. <#${c.id}>`, ephemeral: true})
					  })
			  
			  }
			})
			client.on('interactionCreate', async interaction => {
			  if (!interaction.isStringSelectMenu()) return;
			  if(interaction.customId === "del") {
				if (interaction.values[0] == "panel") {
				  await interaction.deferUpdate()
	const row2 = new ActionRowBuilder()
	.addComponents(
	new ButtonBuilder()
	.setLabel("Add")
	.setStyle(ButtonStyle.Success)
	.setEmoji("➕")
	.setCustomId("add"),
	new ButtonBuilder()
	.setLabel("Remove")
	.setStyle(ButtonStyle.Danger)
	.setEmoji("➖")
	.setCustomId("interest"),
	new ButtonBuilder()
	.setLabel("Delete")
	.setStyle(ButtonStyle.Secondary)
	.setEmoji("🗑️")
	.setCustomId("sil")
	)
	const embed = new EmbedBuilder()
	.setTitle("Member Panel!")
	.setDescription("**You can add or remove members from the buttons below!**")
	.setColor("Random")
	let message = await interaction.channel.messages.fetch(interaction.message.id)
	await message.edit({embeds: [embed], components: [row2]})
			  }
			}
			})
			client.on('interactionCreate', async interaction => {
			  if (interaction.type !== InteractionType.ModalSubmit) return;
			  if (interaction.customId === 'addmenu1') {
				const id = interaction.fields.getTextInputValue('uyeid')
				const channel = interaction.channel
					channel.permissionOverwrites.create(
					  id, {ViewChannel: true}
					  
					  )
					  interaction.reply({content: `🔔 User <@${id}> Successfully Added to Support Request!`})
					} else {
					
			  }
			})
			client.on('interactionCreate', async interaction => {
			  if (interaction.type !== InteractionType.ModalSubmit) return;
			  if (interaction.customId === 'addmenu2') {
				const id = interaction.fields.getTextInputValue('interestid')
				const channel = interaction.channel
					channel.permissionOverwrites.create(
					  id, {ViewChannel: false}
					  
					  )
					  interaction.reply({content: `🔔 <@${id}> User Named Successfully Removed From Support Request!`})
					} else {
				   
			  }
			})
			client.on('interactionCreate', async interaction => {
			if (!interaction.isStringSelectMenu()) return;
			if(interaction.customId === "del") {
			  if (interaction.values[0] == "delete") {
				
				  const channel = interaction.channel
				  channel.delete();
				  client.channels.cache.get(log).send(`🔔 User <@${interaction.user.id}> Deleted Support **${interaction.channel.name}**!`)
				
			  }
			}
			})
			client.on('interactionCreate', async interaction => {
			  if (!interaction.isButton()) return;
			  if(interaction.customId === "sil") {
				 
					const channel = interaction.channel
					channel.delete();
					client.channels.cache.get(log).send(`🔔 <@${interaction.user.id}> User Named **${interaction.channel.name}** Deleted Support!`)
				  
				
			  }
			  })





             