
//Requires
const dotenv = require("dotenv")
dotenv.config()

const {Client,  REST, Routes, GatewayIntentBits, SlashCommandBuilder} = require("discord.js")

const {readdirSync} = require('fs');

var names = readdirSync('commands/')

var commandsTemp = []
for (var name in names) {
	const object = require('./commands/' + names[name]);

	var command = new SlashCommandBuilder()
	.setName(object.usage)
	.setDescription(object.description);

	var options = object.options;

	for (var i in options) {
		var optionI = options[i];
		var type = optionI.type;

		if (type === 'string') {
			command.addStringOption(option => 
				option.setName(optionI.name)
				.setDescription(optionI.description)
				.setRequired(optionI.required)
				.setChoices(...optionI.choices)
				
			)
		}
	}

	commandsTemp.push(command)

}

const commands = commandsTemp;
const rest = new REST({ version: '10'}).setToken(process.env.DTOKEN);

const {hasPerms} = require('./util.js');

//Login to Discord bot
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
client.login(process.env.DTOKEN);

//Enable bot, send a few messages to console.
client.on('ready', async () => {
	console.log(client.user.username + " is enabled.");
	console.log(client.guilds.cache.size)
	//client.user.setActivity( prefix + "help | Version: " + process.env.npm_package_version, { type: "WATCHING"})

		try {
			console.log('Started refreshng application (/) commands.');
			
			console.log(JSON.stringify(commands))
			await rest.put(Routes.applicationCommands(client.user.id), { body: commands});
	
			console.log('Successfully reloaded application (/) commands.')
		} catch (error) {
			console.error(error);
		}

});


client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	var names = readdirSync('commands/')
			//Checks to see if command run is the same as one listed
	names.forEach(name => {
		let command = require("./commands/" + name)
		if (interaction.commandName === name.replaceAll('.js', "")) runCommand(command, client, interaction);
	})
})


//Bot APIs
function runCommand (command, client, interaction)
{
	//Checks if you have the right permissions: 0 = Everyone, 1 = Server Admins, 2 = Bot Owner
	var restriction = command.restriction
	if (hasPerms(restriction, interaction)) command.run(client, interaction)
	else interaction.reply("You do not have permission to run this command.")
};
