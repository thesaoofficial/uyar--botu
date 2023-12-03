const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_BANS
  ]
});
const config = require('./config.json');

// Uyarıları saklamak için bir nesne oluşturun
const uyarilar = {};

const kufurKelimeler = [
  'ananı sikiyim', 
  'orospu çocuğu', 
  'piç', 
  'fallik', 
  'amına koyim', 
  'sikik', 
  'yarrak', 
  'amına korum',
  'sikerim belanı',
  'götünü sikiyim',
  'yavşak',
  'götünü sikiyim',
  'ananı yurdunu sikiyim',
  'senin sülaleni sikiyim',
  'bacını sikiyim',
  'kalıbını siktiğim' // Buraya virgül eklendi
];

client.on('ready', () => {
  console.log(`Bot ${client.user.tag} olarak giriş yaptı.`);
});

client.on('messageCreate', (message) => {
  // Mesajın bot tarafından gönderilmiş olup olmadığını kontrol et
  if (message.author.bot) return;

  // Mesajın içeriğini kontrol et
  const content = message.content.toLowerCase();

  // Küfür kontrolü
  if (kufurKelimeler.some(kelime => content.includes(kelime))) {
    uyariver(message);
  }

  // ... Diğer komutlar ...

});

// ... Diğer olay dinleyicileri ...

function uyariver(message) {
  const user = message.author;
  uyarilar[user.id] = (uyarilar[user.id] || 0) + 1;

  // Kullanıcıya uyarı verildiğini belirt
  message.channel.send(`${user.username}'a bir uyarı verildi. Toplam uyarı sayısı: ${uyarilar[user.id]}`);

  // 4. uyarıyı kontrol et ve sunucudan yasakla
  if (uyarilar[user.id] === 4) {
    const guild = message.guild;
    guild.members.ban(user.id, { reason: '4 uyarı alındı.' })
      .then(() => {
        console.log(`Kullanıcı ${user.username} sunucudan yasaklandı.`);
      })
      .catch((err) => {
        console.error(`Kullanıcıyı yasaklama sırasında bir hata oluştu: ${err}`);
      });
  }
}

// Botunuzun Discord'a giriş yapması için token'i girin
client.login(config.token);
