const { cyan } = require('./colors.json');
const { MessageEmbed } = require("discord.js");
const fs = require('fs');

const dotenv = require("dotenv")
dotenv.config()

const fetch = require('node-fetch');

const delay = ms => new Promise(res => setTimeout(res, ms));
const {exec} = require('child_process');

var utilities = {
	update: function() {
		exec("sh ./shell/update.sh")
	},
	reboot: function() {
		exec("sh ./shell/reboot.sh")
	},
	shutdown: async function() {
/*
		fs.readdir("./", (err, files) => {
    if (err) {
        throw err;
    }

    // files object contains all files names
    // log them on console
    files.forEach(file => {
        console.log(file);
    });
});*/
  	let pid = fs.readFileSync("process.txt", "utf8")
		exec("pgrep -g " + pid + " > parent.txt");
		await delay(2000)
		console.log(pid)
		console.log(process.platform)
		if (process.platform === "linux") {
			await delay(1000)
			exec("sh ./shell/kill-linux.sh")
			/*if (fs.existsSync('parent.txt')) fs.unlink('process.txt', (err) => {if (err) throw err; console.log("file is deleted")})
			exec("sudo pkill -TERM -g " + parentpid)
			process.exit();*/
			/*try {
				process.kill(-parseInt(parentpid))
			}
			catch (err)
			{
				console.log(err)
			}*/


		}
		else {
			await delay(1000)
    	console.log(pid)
	    if (pid !== "") {
					try {
						if (fs.existsSync('process.txt')) fs.unlink('process.txt', (err) => {if (err) throw err; console.log("file is deleted")})
						process.kill(parseInt(pid), "SIGKILL");
					}
					catch (err) {
						console.log(err)
					}
	  	}
		}
	},
	hasPerms: function(restriction, message) {
		let hasPerms = false
		if (restriction >= 2 && (message.author.id === '162369340069511180') hasPerms = true
		else if (restriction === 1 && message.member.hasPermission(['ADMINISTRATOR', 'MANAGE_GUILD'])) hasPerms = true
		else if (restriction === 0) hasPerms = true
		return hasPerms;
	}
}
module.exports = utilities;

async function promptMessage(message, author, time, validReactions) {
	time *= 1000;
	for (const reaction of validReactions) await message.react(reaction);
	const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
	return message
	.awaitReactions(filter, { max: 1, time: time})
	.then(collected => collected.first() && collected.first().emoji.name);
}

function getArrayPart(start, amount, array){
	let returnValue = "";
	for(var i = start; (i < amount + start && i < array.length); i++)
    {
		returnValue += array[i] + "\n";
    }
	return returnValue;
}
