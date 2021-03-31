const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');
const client = new Discord.Client();

let messageNathanInterval;

client.login(process.env.BOT_TOKEN);

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

		if (message.content === '!ching') {
			message.channel.send('chong');
		}

		if (message.content === '!bing') {
			message.channel.send('bong');
		}

		if (message.content === '!listen') {
			if(!messageNathanInterval) {
				messageNathanInterval = setInterval(messageNathan, 3000);
			}
		}

		if (message.content === '!stop') {
			if(messageNathanInterval) {
				clearInterval(messageNathanInterval);
			}

			messageNathanInterval = null;
		}

		if (message.content === '!wormhole') {
			const apiMessage = new Discord.APIMessage(message.channel, {
				content: '<@127296623779774464> wormhole send poop',
				disableMentions: 'none',
			});
			message.channel.send(apiMessage);
		}
	}
});

function isValidUser(author) {
	return !author.bot;
}

function messageNathan() {
	const apiMessage = new Discord.APIMessage(client.channels.cache.get('234762591107284992'), {
		content: '<@235548090050805770> Nathan! Listen!',
		disableMentions: 'none',
	});
	client.channels.cache.get('234762591107284992').send(apiMessage);
}