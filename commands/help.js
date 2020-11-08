//Requires
const { MessageEmbed } = require("discord.js");
const {red, orange, green, cyan} = require("../colors.json");
const {readdirSync} = require('fs');
const {hasPerms} = require('../util.js');

//Command Syntax
var commands = {
	// Command Handling
	run: function(client, message, args) {
		//Embed to send
		let prefix = require('../index.js').prefix
		let embed = new MessageEmbed()
		.setColor(cyan)
		.setTitle(`Hey, ` + message.author.username)
		.setAuthor(`Commands`, client.user.displayAvatarURL)
		.setImage(client.user.displayAvatarURL)
		.setFooter(`Radio Margaritaville by agentdid127`);
		let sendM = false
		var list = readdirSync("./commands/");
		// List of commands
		if (!(args.length > 1)) {
			let cat=[];
			let command2 = []
			list.forEach(file => {
				let command = require("./" + file);
				let restriction = command.restriction;
				if (hasPerms(restriction, message)) {
				if (cat.indexOf(command.section) === -1)
				{
					cat.push(command.section)
					command2[cat.indexOf(command.section)] = []
				}
				command2[cat.indexOf(command.section)].push("`" + prefix + file.replace(".js", "") + "`")
			}

			})
			cat.forEach((item, i) => {
				let m = "";
				command2[i].forEach((item, i) => {
					m = m + (item + ", ");
				});

				embed.addField(item, m.substring(0, m.length-2))
			});

			sendM = true
		}
		// Ask for specific command
		else {
			let match = false;
			list.forEach(file => {
				let command = require("./" + file);
				let restriction = command.restriction;


				if(hasPerms(restriction, message)) {
				if (args[1].toLowerCase() === file.replace(".js", "")) {
					let command = require("./" + file);
					embed.setTitle(`Command: ` + prefix + file.replace(".js", "") )
					embed.setDescription(command.description)
					let aliases = "";
					command.aliases.forEach(alias => {
						aliases += "`" + prefix + alias + "`, "
					})
					embed.addField("Usage", prefix + command.usage)
					embed.addField("Aliases", aliases.substring(0, aliases.length-2))
					match = true;
					sendM = true;
				}
				}
			})


		}
		if (sendM)
		message.channel.send(embed);
		else message.channel.send("Invalid Syntax: Try `p!help [command]`")

	},
	// Sections for command (if we add it)
	section: "Help/Support",
	// Description of command
	description: "Help Command.",
	// Restriction
	restriction: 0,
	//Usage
	usage: "help (command)",
	//Aliases
	aliases: ["halp", "beans"]
}

//Exports Command.
module.exports = commands;
