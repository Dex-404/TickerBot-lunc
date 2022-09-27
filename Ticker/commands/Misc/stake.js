const discord = require('discord.js');
const fs = require('fs')
module.exports = {
    name: "stake",
    aliases: ['steak'],
    description: "Tells the amount staked in LUNC",
    category: "Misc",
    cooldown: 5,

    run: async (client, message, args) => {

        var m = await message.channel.send('Ordering Steak...');

        fs.readFile('/home/dex404/lunc-ticker/lunc-ticker-main/db.json', 'utf-8', (err, db) => {
            if (err) {
                throw err;
            }
            else {
                try {
                    const data = JSON.parse(db);
                    const embed = new discord.EmbedBuilder()
                        .setTitle('LUNC Staking Info')
                        .setDescription(`${data.stake} LUNC Staked 🥩 \n Bone appetite!`)
                        .setFooter({
                            text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({
                                dynamic: true
                            })

                        })
                        .setTimestamp()
                    setTimeout(function () { m.edit({ content: ' ', embeds: [embed] }) }, 800);

                } catch (err) {
                    console.log(err);
                }
            }
        })

    }


}