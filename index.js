const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');
const client = new Discord.Client();

const intervalChannels = {};

client.login(process.env.BOT_TOKEN);

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	const channel = message.channel;

	if (isValidUser(message.author)) {
		console.log(JSON.stringify(message));
		console.log(JSON.stringify(message.author.id));
		console.log(JSON.stringify(message.author.username));
		console.log(JSON.stringify(message.author.tag));

		if (message.content === '!ping') {
			switch (message.author.tag) {
				case process.env.JESIKA_TAG:
					channel.send('No girls allowed.');
					break;
				case process.env.JARED_TAG:
					channel.send('poop');
					break;
				case process.env.MATT_TAG:
					channel.send('pong');
					break;
				case process.env.NATHAN_TAG:
					channel.send('Wtf');
					break;
				case process.env.CHASE_TAG:
					channel.send('It\'s not gay if you\'re underway.');
					break;
				default:
					channel.send('pong');
			}
		}

		if (message.content === '!ching') {
			channel.send('chong');
		}

		if (message.content === '!bing') {
			channel.send('bong');
		}

		if (message.content === '!listen') {
			if(!intervalChannels[channel.id]) {
				intervalChannels[channel.id] = setInterval(() => {
					messageNathan(channel);
				}, 3000);
			}
		}

		if (message.content === '!stop') {
			if(intervalChannels[channel.id]) {
				clearInterval(intervalChannels[channel.id]);
			}

			intervalChannels[channel.id] = null;
		}

		if (message.content === '!wormhole') {
			const apiMessage = new Discord.APIMessage(channel, {
				content: '<@127296623779774464> wormhole send poop',
				disableMentions: 'none',
			});
			channel.send(apiMessage);
		}
	}
});

function isValidUser(author) {
	return !author.bot && (author.tag !== process.env.JESIKA_TAG);
}

function messageNathan(channel) {
	const apiMessage = new Discord.APIMessage(channel, {
		content: '<@235548090050805770> Nathan! Listen!',
		disableMentions: 'none',
	});
	channel.send(apiMessage);
}