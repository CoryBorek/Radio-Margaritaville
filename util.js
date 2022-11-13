const dotenv = require("dotenv")
dotenv.config()


var utilities = {
	hasPerms: function(restriction, interaction) {
		let hasPerms = false
		if (restriction >= 2 && (interaction.user.id === '162369340069511180')) hasPerms = true
		else if (restriction === 1 && interaction.member.hasPermission(['ADMINISTRATOR', 'MANAGE_GUILD'])) hasPerms = true
		else if (restriction === 0) hasPerms = true
		return hasPerms;
	},
	getArrayPart: function(start, amount, array) {
		return getArrayPart(start, amount, array);
	}
}
module.exports = utilities;


function getArrayPart(start, amount, array){
	let returnValue = "";
	for(var i = start; (i < amount + start && i < array.length); i++)
    {
		returnValue += array[i] + "\n";
    }
	return returnValue;
}
