//Requires
const { MessageEmbed } = require("discord.js");
const {red, orange, green, cyan} = require("../colors.json");
const {readdirSync} = require('fs');

//Command Handler
var commands = {
	//What to run
	run: async function(client, message, args) {
		if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
			
			const dispatcher = connection.play('http://radmarg.ic.llnwd.net/stream/radmarg_razorback');
			
			dispatcher.on('start', () => {
				message.channel.send("Joined "+ message.member.voice.channel.name +" and Playing Radio Margaritaville.")
			});

			dispatcher.on('finish', () => {
				message.channel.send("Radio Margaritaville has finished playing.")
			});

			// Always remember to handle errors 
			dispatcher.on('error', console.error);
		}
	},
	//Command Section
	section: "Radio Margaritaville",
	//Description of command
	description: "Replies Pong",
	//Restrictions
	restriction: 0,
	//usage
	usage: "join",
	//Aliases
	aliases: []
}
module.exports = commands;
