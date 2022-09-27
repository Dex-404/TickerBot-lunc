const axios = require('axios');
module.exports = {
    name: "pudding",
    aliases: [],
    description: "Tells the Circulating supply of the LUNC",
    category: "Misc",
    cooldown: 10,
    run: async (client, message, args) => {
        async function getdata() {
            const results = await Promise.all([
                axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=terra-luna&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            ]);

            const value = results[0].data[0];

            const cirSupply = value.circulating_supply;
            var parts = cirSupply.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const fVal = parts.join(".");

            message.channel.send(`Circulating Supply : ${fVal} LUNC\n🍮`);
        }
        getdata();
    }
}