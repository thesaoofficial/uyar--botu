const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json'); // config.json dosyanızı yükleyin

client.on('ready', () => {
  console.log(`Bot ${client.user.tag} olarak giriş yaptı.`);
});

client.on('message', (message) => {
  // Mesajın bot tarafından gönderilmiş olup olmadığını kontrol et
  if (message.author.bot) return;

  // Mesajın belirli bir komut olup olmadığını kontrol et
  if (message.content.startsWith(config.prefix + 'ping')) {
    // Kullanıcıya cevap ver
    message.reply('Pong!');
  }
});

// Botunuzun Discord'a giriş yapması için token'i girin
client.login(config.token);
