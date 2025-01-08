const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios').default;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Provides the weather.')
        .addStringOption(option =>
            option.setName('location')
                .setDescription('Location for weather data.')),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
    //     await interaction.reply(`${interaction.options.getString('location')} was selected by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
    // },
		const location = interaction.options.getString('location') ?? '53719';

        const geocodeOptions = {
            method: 'GET',
            url: 'https://api.geocod.io/v1.7/geocode',
            params: { q: location, api_key: process.env.GEOCODIO_API_KEY, limit: 1 },
        }

        await axios.request(geocodeOptions).then((geoRes) => {
            if (geoRes.status === 200 && geoRes.data.results.length > 0) {
                const options = {
                    method: 'GET',
                    url: 'https://openweather43.p.rapidapi.com/weather',
                    params: { appid: 'da0f9c8d90bde7e619c3ec47766a42f4', q: location, lang: 'en', units: 'imperial' },
                    headers: {
                        'x-rapidapi-key': process.env.WEATHER_API_KEY,
                        'x-rapidapi-host': 'openweather43.p.rapidapi.com',
                    },
                }

                axios.request(options).then((weatherRes) => {
                    console.log(weatherRes.data.weather);
                    switch (weatherRes.data.cod) {
                        case 200:
                            interaction.reply('It\'s ' + Math.round(weatherRes.data.main.temp) + '°F and ' + weatherRes.data.weather[0].description.toLowerCase() + ' in ' + weatherRes.data.name + ' mothafucka.');
                            break;
                        default:
                            console.log(weatherRes);
                            throw new Error('Unexpected response code.');
                    }
                }).catch((error) => {
                    interaction.reply('This shit\'s fuckin broken.');
                    console.log(error);
                });
            }
            else {
                throw new Error('Invalid response from api');
            }
        });
    },
};