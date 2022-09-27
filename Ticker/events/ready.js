const discord = require("discord.js");
const fs = require("fs");

module.exports = async (client) => {
  var loop = setInterval(function () {
    fs.readFile('/home/dex404/lunc-ticker/lunc-ticker-main/db.json', 'utf-8', (err, db) => {
      if (err) {
        throw err;
      } else {
        try {
          const data = JSON.parse(db);
          const rpc = `${data.price} ${data.persentage}`;
          client.user.setActivity(rpc, {
            type: discord.ActivityType.Playing,
          });

        } catch (err) {
          console.log(err);
        }
      }
    });

  }, 60000)

  client.logger.log(
    `> 🔍 • Check All Server is ${client.guilds.cache.size} Server 🌐`,
    "info"
  );
  client.logger.log(
    `> ✅ • Successfully logged on as ${client.user.username}\n\n======================================`,
    "success"
  );
};
