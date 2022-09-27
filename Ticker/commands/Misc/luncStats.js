const discord = require("discord.js");
const axios = require('axios');
const fs = require('fs');
module.exports = {
    name: "lunc-stats",
    aliases: [],
    description: "Tells the Stats of the LUNC",
    category: "Misc",
    cooldown: 5,
    run: async (client, message, args) => {
        var m = await message.channel.send('Fetching LUNC Stats...');
        async function getdata() {
            const results = await Promise.all([
                axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=terra-luna&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            ]);

            const value = results[0].data[0];

            const cirSupply = value.circulating_supply;
            const totalSupply = value.total_supply;
            const marketCap = value.market_cap;
            const vol = value.total_volume;
            const price = value.current_price;
            const change = value.price_change_percentage_24h;
            const high = value.high_24h;
            const low = value.low_24h;

            const percentage = parseFloat(change).toFixed(1);

            try {

                const embed = new discord.EmbedBuilder()
                    .setTitle('LUNC Stats')
                    .setDescription(`Current Price: $${price} USD 🚀`)
                    .addFields({
                        name: 'Market Cap ☢️',
                        value: `$${marketCap.toLocaleString()}`,
                        inline: true
                    }, {
                        name: '24h Volume 🥬',
                        value: `$${vol.toLocaleString()}`,
                        inline: true
                    }, {
                        name: '24h Change %',
                        value: `${percentage}%`,
                        inline: true
                    }, {
                        name: '24h High 📈',
                        value: `$${high}`,
                        inline: true
                    }, {
                        name: '24h Low 📉',
                        value: `$${low}`,
                        inline: true
                    }, {
                        name: 'Circulating Supply 🌎',
                        value: `${cirSupply.toLocaleString()} LUNC`,
                        inline: true
                    }, {
                        name: 'Total Supply 🤑',
                        value: `${totalSupply.toLocaleString()} LUNC`,
                        inline: true
                    })
                    .setFooter({
                        text: `Source: CoinGecko | Requested by ${message.author.username}`,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true
                        })
                    })
                    .setTimestamp()
                setTimeout(function () { m.edit({ content: ' ', embeds: [embed] }) }, 2000);
            } catch (err) {
                console.error(err);
            }
        }
        getdata();
    }
}