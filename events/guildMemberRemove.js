module.exports = member => {
  const channel = member.guild.channels.find('name', 'giriş-çıkış');
  if (!channel) return;
  channel.send(`**ğŸ“¤ |** ${member} **Sunucudan Ã§Ä±kÄ±ÅŸ yaptÄ±!**`);
};