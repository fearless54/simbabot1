const Discord = require('discord.js');
exports.run = function(client, message, args) {
message.channel.sendEmbed(new Discord.RichEmbed()
.setDescription(`Siz :D`)
.setImage(`${message.author.avatarURL} `)
.setColor('RANDOM'));
   }


exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
};

exports.help = {
 name: 'ben',
 description: 'Avatarınızı Atar ',
 usage: 'ben'
};
