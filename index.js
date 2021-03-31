const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (isValidUser(message.author)) {
		console.log(JSON.stringify(message));
		console.log(JSON.stringify(message.author.id));
		console.log(JSON.stringify(message.author.username));
		console.log(JSON.stringify(message.author.tag));

		if (message.content === '!ping') {
			switch (message.author.tag) {
			case 'jesipepsi#8657':
				message.channel.send('No girls allowed.');
				break;
			case 'Jrigg#4257':
				message.channel.send('poop');
				break;
			case 'Matt#2998':
				message.channel.send('pong');
				break;
			case 'chaddy50#7854':
				message.channel.send('Wtf');
				break;
			case 'Charrison947#8020':
				message.channel.send('It\'s not gay if you\'re underway.');
				break;
			default:
				message.channel.send('pong');
			}
		}
	}
});

client.login(process.env.TOKEN);

function isValidUser(author) {
	return !author.bot;
}