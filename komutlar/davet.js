const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
	message.channel.send({embed: {
            color: 0xD97634,
            author: {
              name: "Davet Menüsü",
              icon_url: "https://cdn.discordapp.com/attachments/487719679868272689/488331544587403274/image0.jpg"
            },
			    "thumbnail": {
				 "url": "https://cdn.discordapp.com/attachments/487719679868272689/488329963926192158/image0.png"
			},
            title: "",
            description: "[Davet Linkim](https://discordapp.com/api/oauth2/authorize?client_id=487717420337856517&permissions=8&scope=bot) \n[DBL Sayfası](https://discordbots.org/bot/487717420337856517) \n[Destek Sunucusu](https://discord.gg/md78fkV)",
            fields: [
            ],
            timestamp: new Date(),
            footer: {
              icon_url: "",
              text: "© Simba"
            }
          }
        });  
	    message.react("📝")
}};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['d', 'link', 'linkler'],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Tüm komutları gösterir.',
  usage: 'daget'
};
