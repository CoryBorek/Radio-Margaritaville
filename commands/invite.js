//Requires
const { MessageEmbed } = require("discord.js");
const {red, orange, green, cyan} = require("../colors.json");
const {readdirSync} = require('fs');

//Command Handler
var commands = {
	//What to run
	run: function(client, message, args) {
		message.channel.send(`Getting you the invite...`).then(m => {
		let embed = new MessageEmbed()
			.setColor(cyan)
			.setThumbnail(client.user.displayAvatarURL)
			.setTitle('Invites!')
			.addField('**Invite This Bot:**', `[Click here to invite this bot.](https://discord.com/oauth2/authorize?client_id=774797692911747082&scope=bot&permissions=3275840)`, true)
			//.addField('**Support Server**', `[Click here to join the support server.](https://discord.gg/6AaHaMv)`, true)


			m.delete()
			message.channel.send(embed)
      })
	},
	//Command Section
	section: "Radio Margaritaville",
	//Description of command
	description: "Sends an invite to the Developer's server and to add your own ParksBot",
	//Restrictions
	restriction: 0,
	//usage
	usage: "invite",
	//Aliases
	aliases: ["bot", "server", "assist"]
}
module.exports = commands;
