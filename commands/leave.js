//Requires
const { MessageEmbed } = require("discord.js");
const {red, orange, green, cyan} = require("../colors.json");
const {readdirSync} = require('fs');
const { getVoiceConnection } = require('@discordjs/voice');


//Command Handler
var commands = {
	//What to run
	run: async function(client, interaction) {
		if (interaction.member.voice.channel) {
            const connection = getVoiceConnection(interaction.member.voice.channel.guild.id);
			connection.destroy();
			interaction.reply({content: "Now Leaving " + interaction.member.voice.channel.name})
		}
	},
	//Command Section
	section: "Radio Margaritaville",
	//Description of command
	description: "Leaves channel.",
	//Restrictions
	restriction: 0,
	//usage
	usage: "leave",

	options: []
}
module.exports = commands;
