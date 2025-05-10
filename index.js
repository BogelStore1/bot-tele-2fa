require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Selamat datang! Kirimkan secret 2FA Anda untuk mendapatkan kode OTP.');
});

bot.on('text', async (ctx) => {
  const secret = ctx.message.text.trim();

  try {
    const res = await axios.get(`https://2fa.biz.id/generatecode?secret=${encodeURIComponent(secret)}`);
    const otp = res.data.otp;

    if (otp) {
      ctx.reply(`\`${otp}\``); // Format mono dengan satu backtick
    } else {
      ctx.reply('❌ Gagal mendapatkan OTP. Secret tidak valid.');
    }
  } catch (err) {
    console.error(err);
    ctx.reply('⚠️ Terjadi kesalahan saat mengambil OTP.');
  }
});

bot.launch();
console.log('Bot berjalan...');
