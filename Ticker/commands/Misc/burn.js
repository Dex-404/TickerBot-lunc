const fs = require('fs');
const discord = require("discord.js");
module.exports = {
    name: "burn",
    aliases: [],
    description: "Tells the Current amount of burnned LUNC",
    category: "Misc",
    cooldown: 5,
    run: async (client, message, args) => {

        var m = await message.channel.send('Awaiting Data...');

        fs.readFile('/home/dex404/lunc-ticker/lunc-ticker-main/db.json', 'utf-8', (err, db) => {
            if (err) {
                throw err;
            }
            else {
                try {
                    const data = JSON.parse(db);
                    

                    if(args[0] == 'adv'){
                        const embed = new discord.EmbedBuilder()
                        .setTitle(`🔥 **Total Burnt: **${data.tBurn} LUNC | ${data.ust_burned} USTC 🔥\n `)
                        .addFields(

                            {
                                name: '\u200b',
                                value: '**__LUNC Burn info__ ->**',
                                inline: false
                            },
                            {
                                name: 'Burnt Today by the Community:',
                                value: `${data.lunc_burn_td_cm} LUNC`,
                                inline: true
                            },
                            {
                                name: 'Burnt Today with Tax:',
                                value: `${data.lunc_burn_td_tax} LUNC`,
                                inline: true
                            },
                            {
                                name: 'Total LUNC Burnt Today:',
                                value: `${data.lunc_burn_td_total} LUNC`,
                                inline: true
                            },
                            {
                                name: 'Total Burnt By the community:',
                                value: `${data.lunc_burned} LUNC`,
                                inline: true
                            },
                            {
                                name: 'Total Burnt with Tax:',
                                value: `${data.tax} LUNC`,
                                inline: true
                            },
                            {
                                name: '\u200b',
                                value: '**__USTC Burn info__ ->**',
                                inline: false
                            },
                            {
                                name: 'Burnt Today by the Community:',
                                value: `${data.ust_burn_td_cm} USTC`,
                                inline: true
                            },
                            {
                                name: 'Burnt Today with Tax:',
                                value: `${data.ust_burn_td_tax} USTC`,
                                inline: true
                            },
                            {
                                name: 'Total USTC Burnt Today:',
                                value: `${data.ust_burn_td_total} USTC`,
                                inline: true
                            })
                       
                        .setFooter({
                            text: `Timezone > UTC | Requested by ${message.author.username}`,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true
                            })
                        })
                        .setTimestamp()
                    setTimeout(function () { m.edit({ content: ' ', embeds: [embed] }) }, 1000);
                    }
                    else{
                        setTimeout(function () { m.edit({ content: `**Burnt by the community: ** ${data.lunc_burned} LUNC\n **Burnt with tax: ** ${data.tax} LUNC\n\n 🔥**Total Burnt: ** ${data.tBurn} LUNC🔥` }) }, 1000);
                    }
                        
                } catch (err) {
                    console.log(err);
                }
            }
        })


    }
}