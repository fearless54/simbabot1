//consts (for glitch)
// GEREKLİ YERLER
const express = require('express');
const app = express();
const http = require('http');
app.get("/", (request, response) => {
    console.log(`az önce panelime biri' tıkladı.`);
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// GEREKLİ YERLER
// -------------------------------------------------------------
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { GOOGLE_API_KEY } = require('./ayarlar.json');
const YouTube = require('simple-youtube-api');
const superagent = require("superagent");
const chalk = require('chalk');
const fs = require('fs');
const Jimp = require('jimp');
const weather = require('weather-js')
const hastebin = require('hastebin-gen');
const moment = require('moment');
const jsonfile = require('jsonfile')
require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
require('./util/eventLoader')(client);

const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};


  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
      let props = require(`./komutlar/${f}`);
      log(`Yüklenen komut: ${props.help.name}.`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });

  client.reload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./komutlar/${command}`)];
        let cmd = require(`./komutlar/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e){
        reject(e);
      }
    });
  };

  client.load = command => {
    return new Promise((resolve, reject) => {
      try {
        let cmd = require(`./komutlar/${command}`);
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e){
        reject(e); 
      }
    });
  };

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

var oyun = [
        ".yardım | .davet |",
        "Simba Sunucusu Tarafından Hazırlandım^^",
        ".canlıdestek Aktif^^",
        "Destek Sunucuma Gelerek Yardım Alabilirsiniz^^",
        "Örnek Yazı 5"
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setGame(oyun[random], "PLAYING");
       }, 15 * 2500);

// Kod'u Paylaştığı için <@!336842798944878593> 'e teşekkürler

client.on('guildMemberAdd', async member => {
  member.sendEmbed(new Discord.RichEmbed().setThumbnail('https://cdn.discordapp.com/attachments/487719679868272689/488329963926192158/image0.png').setDescription('Bot Yapmayı Bilmiyormusun Veya Komut Eksikliklerinmi Var ? \nO Zaman Bu Sunucuya Gelerek Destek Alabilirsin :wink: \n\n\n[Üzerime Tıklayarak Destek Sunucusuna Gidebilirsin](https://discord.gg/8uVYpJ8) \n\n[Üzerime Tıklayarak Beni Sunucuna Ekleyebilirsin](https://discordapp.com/oauth2/authorize?client_id=487717420337856517&scope=bot&permissions=8)').setTitle('Destek Sunucuma Davetlisin').setColor('RANDOM'));
  });
client.on('guildMemberRemove', async member => {
  member.sendEmbed(new Discord.RichEmbed().setThumbnail('https://cdn.discordapp.com/attachments/487719679868272689/488329963926192158/image0.png').setDescription('Bot Yapmayı Bilmiyormusun Veya Komut Eksikliklerinmi Var ? \nO Zaman Bu Sunucuya Gelerek Destek Alabilirsin :wink: \n\n\n[Üzerime Tıklayarak Destek Sunucusuna Gidebilirsin](https://discord.gg/8uVYpJ8) \n\n[Üzerime Tıklayarak Beni Sunucuna Ekleyebilirsin](https://discordapp.com/oauth2/authorize?client_id=487717420337856517&scope=bot&permissions=8)').setTitle('Destek Sunucuma Davetlisin').setColor('RANDOM'));
  });

client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.find('name', 'simba');//log ismini ayarlÄ±yacaksÄ±nÄ±z log adÄ±nda kanal aÃ§Ä±n
  if (!channel) return;
        let username = member.user.username;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/482937585367253022/488054775607459850/image0.jpg");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

client.on("guildMemberRemove", async member => {
  const channel = member.guild.channels.find('name', 'simba');//log ismini ayarlÄ±yacaksÄ±nÄ±z log adÄ±nda kanal aÃ§Ä±n
  if (!channel) return;
        let username = member.user.username;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {            
                        const bg = await Jimp.read("https://cdn.discordapp.com/attachments/487719679868272689/488673451003871232/image0.jpg");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'kasaaç') {
    var sans = ["Hiçbirşey :cry:", "Stattrak AWP | Asiimov", "Karambit | Doopler :dagger:", "Hatıra USP-S | Leş Onaylandı", "Kancalı Bıçak | Fade :dagger:", "Desert Eagle | Kızıl Ağ", "Hatıra Dragon Lore", "Stattrak M4A1 | Uluma", "SGG 07 | Sudaki Kan", "Hatıra Glock 18 | Fade", "AWP | Medusa", "Desert Eagle | Alev", "Stattrak AK-47 | Vulkan",  "M4A1-S | Hiper Canavar",  "Hatıra M4A1-S | Altın Bobin", "Statrak AWP | Elektrikli Kovan", "P90 | Ecel Kedisi", "AWP | Yıldırım Çarpması", "Karambit | Mazi :dagger:", "Hatıra Faction Bicaği :dagger:"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    msg.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Sana **${sonuc}** Çıktı.`).setTitle('Başarıyla Kasa Açıldı').setThumbnail('https://cdn.discordapp.com/attachments/487719679868272689/488329963926192158/image0.png').setColor('RANDOM'));
  }
});
  
client.on('message', async message => {
    if (message.isMentioned(client.user)) {
      message.channel.send(new Discord.RichEmbed().setDescription(`Tüm Komutları Görmek İçin : **${prefix}yardım** \nBotun Prefixi : **${prefix}** \nBotun Ping’i : **${client.ping}** ms \nİşlemci Modeli : **${os.cpus().map(i => `${i.model}`)[0]}** \n**Yapımcım** : <@472574417843519498> | **Keystone🐉#2252** `).setColor('RANDOM').setTitle('Bot Hakkında Bilgi'))    }
})


client.on("message", async message => {
    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    if (command === "tersyazma") {
        const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>¿@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
        // Start with the character '!'
        const OFFSET = '!'.charCodeAt(0);
        if (args.length < 1) {
            message.channel.send('Ters yazılacak yazıyı yazmalısın.');
        }

        message.channel.send(
            args.join(' ').split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .reverse().join('')
        )
    }
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
 
  if(command === "eval") {
    if (message.author.id !== '472574417843519498') {
        return message.channel.send('Bak Şuan Kullandın.')

    }
    function clean(text) {
        if (typeof text !== 'string')
            text = require('util').inspect(text, { depth: 0 })
        let rege = new RegExp(client.token, "gi");
        text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
            .replace(rege, 'Bak Şuan Tokenim Bu :joy:')
        return text;
    };
    async function send(embed) {
        message.channel.send(embed);
    }

    const evalEmbed = new Discord.RichEmbed().setColor(0xffffff)
    const code = args.join(' ');
    try {
        const evaled = clean(await eval(code));
        if (evaled.constructor.name === 'Promise') evalEmbed.setDescription(`\`\`\`xl\n${evaled}\n\`\`\``)
        else evalEmbed.setDescription(`\`\`\`xl\n${evaled}\n\`\`\``)
        evalEmbed.setColor('0x42f468')
        if (evaled.length < 800) { send(evalEmbed) }
        else {
            let url = await hastebin(evaled, "js").catch(err => console.log(err.stack));
            const newEmbed = new Discord.RichEmbed()
                .addField('📥 Giriş', `\`\`\`\n${code}\n\`\`\``)
                .addField('📤 Çıkış', `\n**[${url}](${url})**`)
                .setColor('0x42f468');
           message.channel.send(newEmbed);
        }
    }
    catch (err) {
        evalEmbed.setColor('0xff0000');
        evalEmbed.addField('HATA', `\`\`\`xl\n${err}\n\`\`\``);

        message.channel.send(evalEmbed);
    }
}});

client.on(`message`, async message => {
  if(message.content === prefix + "reboot") { 
if (message.author.id === "487066145891942439") {
  message.channel.send(":gear: | ``Yeniden Başlatıyorum^^``")
  
  client.destroy()
  client.login(ayarlar.token)
message.channel.send(":gear: | ``Yeniden Başlatma Tamamlandı^^``")
} else {
	
message.channel.send("``Bak Şuan Yeniden Başladım^^``")
  
  }
  }
})

client.on('message', async message => {
    if (message.content.toLowerCase() === prefix + 'döviz') {
var request = require('request');
request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
        var info = JSON.parse(body);
request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error); 
    else if (!error) { 
        var euro = JSON.parse(body);
      message.channel.send(new Discord.RichEmbed().setDescription(`Dolar Satış: **${info.selling}** \nDolar Alış: **${info.buying}** \n\nEuro Satış: **${euro.selling}TL** \nEuro Alış: **${euro.buying}TL**`).setColor('RANDOM').setTitle('Anlık Döviz Kurları'))    }
})
    }
})
    }
})

client.on("message", async message => {
    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    if (command === "vaporwave") {
        const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>¿@ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ[/]^_`ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ{|}~';
        const OFFSET = '!'.charCodeAt(0);
        if (args.length < 1) {
            message.channel.send(':warning: | Şekilli Yazdırmanı İstediğin ``Yazıyı/Metini`` Yazmadın.');
        }

        message.channel.send(
            args.join(' ').split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .join('')
        )
    }
});

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "sniper") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(310, 325)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2FPNGPIX-COM-Crosshair-PNG-Transparent-Image.png?1529363625811", (err, avatar) => {
                avatar.resize(310, 325)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "wasted") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2F1.png?1529363616039", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "hpbalance") {		
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)	
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/484692865985806346/487843441552654337/image8.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 0, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "hpbravery") {		
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)	
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/484692865985806346/487843440864919554/image7.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 0, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "hpbrilliance") {		
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)	
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/484692865985806346/487843440864919552/image6.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 0, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "dcbughunter") {		
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)	
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/484692865985806346/487843440441425922/image5.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 0, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "hpevent") {		
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)	
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/484692865985806346/487843440441425920/image4.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 0, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
}) 

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "dcstaff") {		
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)	
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/484692865985806346/487843438981677067/image1.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 0, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
})

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "atatürk") {		
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)	
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/484692865985806346/487849021658890240/image0.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 0, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
})

client.on("message", async message => {	
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "dcpartner") {		
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)	
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/484692865985806346/487843439740715028/image2.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 0, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "hacked") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/484692865985806346/487837060326227972/image0.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});



client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + ".winner") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)
            image.greyscale()
            image.gaussian(1)
            Jimp.read("https://cdn.discordapp.com/attachments/484692865985806346/487841969561796608/image0.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

const snekfetch = require('snekfetch');
let points = JSON.parse(fs.readFileSync('./xp.json', 'utf8'));

var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on("message", async message => {
    if (message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  if (!points[user.id]) points[user.id] = {
    points: 0,
    level: 0,
  };

  let userData = points[user.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    userData.level = curLevel;
        var user = message.mentions.users.first() || message.author;
message.channel.send(`🏅 **| ${user.username} Ne Kadarda Aktifsin xD. ``Level Atladınn``!**`)
    }

fs.writeFile('./xp.json', JSON.stringify(points), (err) => {
    if (err) console.error(err)
  })

  if (message.content.toLowerCase() === prefix + 'profil' || message.content.toLowerCase() === prefix + 'profile') {
const level = new Discord.RichEmbed().setTitle(`${user.username}`).setDescription(`**Seviye:** ${userData.level}\n**GP:** ${userData.points}`).setColor("#ffff00").setFooter(``).setThumbnail(user.avatarURL)
message.channel.send(`:pencil: **| ${user.username} adlı kullanıcının profil kartı**`)
message.channel.send(level)
  }
});

// Ayarlanan sayıya ulaştığında mesaj gönderelim ve sayacı sıfırlayalım


client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})

// Sunucuya birisi girdiği zaman mesajı yolluyalım


client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})

// Sunucuya birisi girdiği zaman mesajı yolluyalım


client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('Sayaç Sistemi')
    .setDescription(`:outbox_tray: Güle Güle :outbox_tray: \n╔▬▬▬▬▬▬▬▬Sayaç▬▬▬▬▬▬▬▬▬\n║►             ${member.user.tag}\n║► Kullanıcı Ayrıldı \n║► **${sayac[member.guild.id].sayi}** Kişi Olmamıza ➡️ **${sayac[member.guild.id].sayi - member.guild.memberCount}** ⬅️ Kişi Kaldı\n║► Senin Ayrılmanla Beraber **${member.guild.memberCount}**  Kişiyiz! :outbox_tray:\n╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
 .setColor("RED")
    .setFooter("LFS TEAM", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(embed);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});

//Kullanıcı sunucudan ayrıldığında ayarlanan kanala mesaj gönderelim.
client.on("guildMemberAdd", async (member) => {
      let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
      let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
      let autorole =  JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
      let role = autorole[member.guild.id].otorol

      member.addRole(role)

  let embed = new Discord.RichEmbed()
    .setTitle('Sayaç Sistemi')
    .setDescription(`:inbox_tray: Hoş Geldin :inbox_tray: \n╔▬▬▬▬▬▬▬▬Sayaç▬▬▬▬▬▬▬▬▬\n║►             ${member.user.tag}\n║► Kullanıcı Katıldı \n║► **${sayac[member.guild.id].sayi}** Kişi Olmamıza ➡️ **${sayac[member.guild.id].sayi - member.guild.memberCount}** ⬅️ Kişi Kaldı\n║► Senin Katılmanla Beraber **${member.guild.memberCount}**  Kişiyiz! :inbox_tray:\n╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("GREEN")
    .setFooter("LFS TEAM", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let welcomechannel = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    welcomechannel.send(embed);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
});

client.on("message", msg => {
        const reklam = ["discordapp", "discord.gg", "discord.tk", "discordbots.org", "https://discordapp.com", "https://discord.gg", "http://discord.gg", "htpp:/discordapp.com", "https://discordbots.org"];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bu Linki Benden Başkası Görmedi :joy:').setTitle('Maalesef Reklam Yapamadın :joy:').setColor('RANDOM')).then(msg => msg.delete(3000));
             }              
          } catch(err) {
            console.log(err);
          }
        }
    });

client.on('guildMemberAdd', member => {
    console.log('Kullanıcı ' + member.user.username + '#'  + member.user.discriminator + ' Sunucuya Katıldı! ')
})

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
