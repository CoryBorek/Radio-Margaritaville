//Requires
const { MessageEmbed } = require("discord.js");
const {red, orange, green, cyan} = require("../colors.json");
const {readdirSync} = require('fs');

//Command Handler
var commands = {
	//What to run
	run: function(client, message, args) {
    message.channel.send("Restarting Bot.")
		client.user.setActivity("Quickly Restarting. Will be back in a minute!")
		let util = require('../util.js');
		util.reboot();
		util.shutdown();
		//client.shard.broadcastEval('process.exit()');
	},
	//Command Section
	section: "Owner",
	//Description of command
	description: "Restarts Parksbot",
	//Restrictions
	restriction: 2,
	//Usage
	usage: "update",
	//Aliases
	aliases: ["reboot"]
}
module.exports = commands;
