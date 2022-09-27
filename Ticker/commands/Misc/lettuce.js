const fs = require('fs');
module.exports = {
    name: "lettuce",
    aliases: ['lunc', 'price'],
    description: "Tells the Current Price of the LUNC",
    category: "Misc",
    cooldown: 5,
    run: async (client, message, args) => {

        fs.readFile('/home/dex404/lunc-ticker/lunc-ticker-main/db.json', 'utf-8', (err, db) => {
            if (err) {
                throw err;
            }
            else {
                try {
                    const data = JSON.parse(db);
                    message.channel.send(`LUNC :${data.price} | ${data.persentage}`)
                } catch (err) {
                    console.log(err);
                }
            }
        })


    }
}