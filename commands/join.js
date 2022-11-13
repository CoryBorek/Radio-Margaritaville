//Requires
const { MessageEmbed, InteractionCollector } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const {red, orange, green, cyan} = require("../colors.json");
const {readdirSync} = require('fs');

//Command Handler
var commands = {
	//What to run
	run: async function(client, interaction) {
		if (interaction.member.voice.channel && interaction.member.voice.channel.joinable) {
            const connection = await joinVoiceChannel({
				channelId: interaction.member.voice.channel.id,
				guildId: interaction.member.voice.channel.guild.id,
				adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator
			});
			
			const player = createAudioPlayer();
			const resource = createAudioResource('http://radmarg.ic.llnwd.net/stream/radmarg_razorback', { inlineVolume: true});
			
			connection.subscribe(player);
			player.play(resource);

			player.on('error', error => {
				console.error(error);
			});

			player.on(AudioPlayerStatus.Idle, () => {
				player.play(resource);
			});

			interaction.reply({content: 'Joined Channel: ' + interaction.member.voice.channel.name});
		}
		else {
			interaction.reply('Sorry! but you\'re not in a channel!')
		}
	},
	//Command Section
	section: "Radio Margaritaville",
	//Description of command
	description: "Joins your channel and plays Radio Margaritaville",
	//Restrictions
	restriction: 0,
	//usage
	usage: "join",

	options: []
}
module.exports = commands;
