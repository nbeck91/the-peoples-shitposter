const { Events, MessageFlags } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	name: Events.MessageCreate,
    execute (message) {
        const channel = message.channel

        if (message.content === '$ping') {
            switch (message.author.id) {
                case process.env.NATE_ID:
                    channel.send('pong');
                    break;
                case process.env.TAYLOR_ID:
                    channel.send('hyuck tuah');
                    break;
                default:
                    channel.send('What the fuck did you just fucking say about me, you little bitch? I\'ll have you know I graduated top of my class in the Navy Seals, and I\'ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I\'m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You\'re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that\'s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn\'t, you didn\'t, and now you\'re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You\'re fucking dead, kiddo.');
            }
        }

        if (message.content.toLowerCase().includes('wtf')) {
            const wtf = require('../wtf.json').wtf;
            message.reply(wtf[Math.floor(Math.random() * wtf.length)]);
        }

        if (message.content.toLowerCase().includes('$conch')) {
            const questionWords = [
                'am', 'are', 'is', 'isnt', 'was', 'wasnt', 'were', 'werent', 'has', 'hasnt', 'have', 'havent', 'do', 'does', 'dont', 'doesnt', 'did', 'didnt', 'can', 'cant', 'could', 'couldnt', 'will', 'wont', 'would', 'wouldnt', 'should', 'shouldnt', 'shall',
            ];

            const responses = [
                'Maybe someday.', 'I don\'t think so.', 'No.', 'When hell freezes over.', 'Yes.', 'Absolutely.',
            ];
        
            const question = message.content.replace('$conch', '').replace(/[^a-zA-Z\s:]/g, '').trim().toLowerCase().split(' ');
        
            if ((question.length >= 3) && questionWords.includes(question[0])) {
                // Random between 2 and 5 seconds
                const timeout = (Math.floor(Math.random() * (6 - 2)) + 2) * 1000;
        
                setTimeout(() => {
                    message.reply(responses[Math.floor(Math.random() * responses.length)]);
                }, timeout);
            }
            else {
                message.reply('Ask a yes or no question.');
            }
        }
    },
};