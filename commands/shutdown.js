//Requires
const { MessageEmbed } = require("discord.js");
const {red, orange, green, cyan} = require("../colors.json");
const {readdirSync} = require('fs');

//Command Handler
var commands = {
	//What to run
	run: function(client, message, args) {
			message.channel.send("Shutting Down " + client.user.username)
			client.user.setActivity("So Long! Farewell! I hope to see you soon!")
			require("../util.js").shutdown();

		//client.shard.broadcastEval('process.exit()');
	},
	//Command Section
	section: "Owner",
	//Description of command
	description: "Turns off bot.",
	//Restrictions
	restriction: 2,
	//usage
	usage: "shutdown",
	//Aliases
	aliases: ["stop"]
}
module.exports = commands;
