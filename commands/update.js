//Requires
const { MessageEmbed } = require("discord.js");
const {red, orange, green, cyan} = require("../colors.json");
const {readdirSync} = require('fs');

//Command Handler
var commands = {
	//What to run
	run: function(client, message, args) {
    message.channel.send("Updating Bot.")
		client.user.setActivity("Quickly Updating. Will be back in a minute!")
		let util = require('../util.js');
		util.update();
		util.shutdown();
		//client.shard.broadcastEval('process.exit()');
	},
	//Command Section
	section: "Owner",
	//Description of command
	description: "Updates ParksBot from the github repository",
	//Restrictions
	restriction: 2,
	//Usage
	usage: "update",
	//Aliases
	aliases: ["upgrade"]
}
module.exports = commands;
