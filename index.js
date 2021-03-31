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
			case process.env.JESIKA_TAG:
				message.channel.send('No girls allowed.');
				break;
			case process.env.JARED_TAG:
				message.channel.send('poop');
				break;
			case process.env.MATT_TAG:
				message.channel.send('pong');
				break;
			case process.env.NATHAN_TAG:
				message.channel.send('Wtf');
				break;
			case process.env.CHASE_TAG:
				message.channel.send('It\'s not gay if you\'re underway.');
				break;
			default:
				message.channel.send('pong');
			}
		}
	}
});

client.login(process.env.BOT_TOKEN);

function isValidUser(author) {
	return !author.bot;
}