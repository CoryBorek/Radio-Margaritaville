
//Requires
const dotenv = require("dotenv")
dotenv.config()

const {Client, Collection} = require("discord.js")
const client = new Client();
const {readdirSync} = require('fs');
const {hasPerms} = require('./util.js');

const fetch = require('node-fetch');

const prefix = process.env.prefix;

const util = require('./util.js')

//Login to Discord bot
client.login(process.env.DTOKEN);
require("http").createServer(async (req,res) => {res.statusCode = 200; res.write("Welcome back to ParksBot! Created by Potatoes Development"); res.end()})

//Enable bot, send a few messages to console.
client.on('ready', () => {
	console.log("ParksBot is enabled.");
	console.log(client.guilds.cache.size)
	//dbl.postStats(client.guilds.size, client.shard.ids[0], client.shards.total).catch(console.errpr);
	/*client.shard.fetchClientValues('client.guilds.cache.size').then(results => {
		console.log(`Servers: ${results.reduce((acc, guildCount) => acc + guildCount, 0)}`);
	}).catch(console.error)*/
	client.user.setActivity( prefix + "help | Version: " + process.env.npm_package_version, { type: "WATCHING"})

});


//Message Handler
client.on('message', message => {
	if (message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	//Commands
	if (message.content.startsWith(prefix))
	{
			//Grabs all commands
			var names = readdirSync('commands/')
			//Checks to see if command run is the same as one listed
			names.forEach(name => {
				let command = require("./commands/" + name)
				if (args[0].toLowerCase() === name.replace(".js", "")) runCommand(command, client, message, args);
				command.aliases.forEach(alias => {
					if (args[0].toLowerCase() === alias) runCommand(command, client, message, args);
				})

			})

			// Send Notification about rewrite until we release stuff.
		/*else
		message.channel.send("ParksBot is currently getting a rewrite, so some features may not work as planned. We hope to get more back to you soon!")
	*/
	}
	// When Bot is mentioned, grab prefix (limited to only Cory temporarily)
	else if (message.mentions.members.find( user => user.id === client.user.id) && !message.author.bot) message.channel.send(`The Server Prefix is: \`` + prefix + `\`. You can not currently change it. Former saved accounts will come back at a later date.`)

})

//Bot APIs
function runCommand (command, client, message, args)
{
	//Checks if you have the right permissions: 0 = Everyone, 1 = Server Admins, 2 = Bot Owner
	var restriction = command.restriction
	if (hasPerms(restriction, message)) command.run(client, message, args)
	else message.channel.send("You do not have permission to run this command.")
}

//Send Prefix to other commands etc.
module.exports = {
	prefix: prefix
}
