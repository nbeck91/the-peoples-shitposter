const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios').default;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pun')
		.setDescription('Tells something punny.'),
    async execute(interaction) {
        const options = {
            method: 'GET',
            url: 'https://v2.jokeapi.dev/joke/Pun',
        }

        await axios.request(options).then((res) => {
            if (res.data.type === 'twopart') {
                interaction.reply(res.data.setup + '...');
                setTimeout(() => {
                    interaction.editReply(res.data.setup + '...' + '\n\n' + res.data.delivery);
                }, 5000);
            } else {
                setTimeout(() => {
                    interaction.reply(res.data.joke);
                }, 2000);
            }
        }).catch((error) => {
            interaction.reply('The joke is that this API doesn\'t work.');
            console.log(error);
        });
    },
};