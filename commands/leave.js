//Requires
const { MessageEmbed } = require("discord.js");
const {red, orange, green, cyan} = require("../colors.json");
const {readdirSync} = require('fs');


//Command Handler
var commands = {
	//What to run
	run: async function(client, message, args) {
		if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.leave();
		}
	},
	//Command Section
	section: "Radio Margaritaville",
	//Description of command
	description: "Replies Pong",
	//Restrictions
	restriction: 0,
	//usage
	usage: "ping",
	//Aliases
	aliases: ["shot"]
}
module.exports = commands;
