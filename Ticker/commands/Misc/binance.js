const discord = require("discord.js");
const ccxt = require('ccxt');
module.exports = {
    name: "binance",
    aliases: [],
    description: "Tells all the Binance Stats",
    category: "Misc",
    cooldown: 5,
    run: async (client, message, args) => {
        const binance = new ccxt.binance();
        var m = await message.channel.send("Fetching Data...");
        var marketData = async () => {

            const config = {
                asset: 'LUNC',
                base: 'BUSD'
            };

            const { asset, base } = config

            const market = `${asset}/${base}`;
            const data = await binance.fetchTicker(market)
            const finalData = data.info

            const priceChange = finalData.priceChange
            const priceChangePercent = finalData.priceChangePercent
            const weightedAvgPrice = finalData.weightedAvgPrice
            const prevClosePrice = finalData.prevClosePrice
            const lastPrice = finalData.lastPrice
            const raw_volume = finalData.volume
            const volume = parseFloat(raw_volume).toFixed(2)
            const raw_quoteVolume = finalData.quoteVolume
            const quoteVolume = parseFloat(raw_quoteVolume).toFixed(2)
            try {
                const embed = new discord.EmbedBuilder()
                    .setTitle('Binance Stats')
                    .setDescription(`Current Price: $${lastPrice} USD`)
                    .addFields(
                        {
                            name: '24h Change',
                            value: `${priceChange} | ${priceChangePercent}%`,
                            inline: true
                        },
                        {
                            name: '24h Volume',
                            value: `${volume} LUNC`,
                            inline: true
                        },
                        {
                            name: '24h Quote Volume',
                            value: `${quoteVolume} BUSD`,
                            inline: true
                        },
                        {
                            name: 'Weighted Average Price',
                            value: `$${weightedAvgPrice}`,
                            inline: true
                        },
                        {
                            name: 'Previous Close Price',
                            value: `$${prevClosePrice}`,
                            inline: true
                        })
                    .setFooter({
                        text: `Source Binance | Requested by ${message.author.username}`,
                        icon_url: message.author.displayAvatarURL({
                            dynamic: true
                        })
                    })
                    .setTimestamp()
                message.channel.send({ embeds: [embed] })
            } catch (e) {
                console.error(e)
            }
        }

        marketData()
    }
}



