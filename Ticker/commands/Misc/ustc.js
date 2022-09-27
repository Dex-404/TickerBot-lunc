const fs = require('fs')
module.exports = {
    name: "ustc",
    aliases: [],
    description: "Tells the Current Price of the USTC",
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
                    message.channel.send(`USTC: ${data.ustc} | ${data.ustc_percentage}`)
                } catch (err) {
                    console.log(err);
                }
            }
        })


    }
}