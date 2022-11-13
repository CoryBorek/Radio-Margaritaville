//Requires
const { EmbedBuilder } = require("discord.js");
const {cyan} = require("../colors.json");

//Command Handler
var commands = {
	//What to run
	run: function(client, interaction) {
		
		let embed = new EmbedBuilder()
			.setColor(cyan)
			.setThumbnail(client.user.avatarURL())
			.setTitle('Invites!')
			.addFields(
				{
					name: '**Invite This Bot:**',
					value: `[Click here to invite this bot.](https://discord.com/oauth2/authorize?client_id=774797692911747082&scope=bot&permissions=3275840)`,
					inline: true
				}
			)
		interaction.reply({content: '', embeds: [embed]})
      
	},
	//Command Section
	section: "Radio Margaritaville",
	//Description of command
	description: "Sends and invite link to this bot",
	//Restrictions
	restriction: 0,
	//usage
	usage: "invite",

	options: []
}
module.exports = commands;
