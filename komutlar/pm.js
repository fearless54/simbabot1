const Discord = require('discord.js');
exports.run = (client, message, args) => {
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: UyarÄ± :warning:', '`pm` adlÄ± komutu Ã¶zel mesajlarda kullanamazsÄ±n.');
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild;
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (reason.length < 1) return message.reply('Ne gÃ¶ndericem onuda yazÄ± ver.');
  if (message.mentions.users.size < 1) return message.reply('Kime pm atÄ±cam onuda @kullanÄ±cÄ± ÅŸeklinde yazÄ± ver.').catch(console.error);
  message.delete();
  message.reply('MesajÄ±nÄ± gÃ¶nderdim.')
  const embed = new Discord.RichEmbed()
  .setColor(0xff2578)
  .setTitle(`Bir mesaj alÄ±ndÄ± gÃ¶nderen: ${message.author.username}`)
  .setDescription(reason);
  return user.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permlevel: 4,
};

exports.help = {
  name: 'sanane',
  description: 'Bir kullanÄ±cÄ±ya Ã¶zel mesaj yollar.',
  usage: 'sanane'
};