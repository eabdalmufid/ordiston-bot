import fs from 'fs';
import { photofunSearch, photofunEffect, photofunUse, photofunImg, photofunImg2, photofunText } from '../lib/photofunia.js';

const handler = async (m, { conn, text }) => {
  const parts = text.trim().split("|").map(item => item.trim());

  if (parts.length < 1) {
    conn.reply(m.chat, '📚 Contoh penggunaan: *photofunia query|page|part*', m);
    return;
  }

  const query = parts[0];
  const part = parseInt(parts[1]) || 0;
  const input = parts[2];

  try {
    const data = await photofunSearch(query);

    if (data && data.length > 0) {
      if (part > 0 && part <= data.length) {
        const result = data[part - 1];
        const message = `
📜 *Title:* ${result.judul}
💬 *Comments:* ${result.desc}`;

        const effect = await photofunEffect(result.link);

        if (effect[0].inputs[0].input == 'image') {
          if (input) {
          if (effect[0].inputs.length == 2) {
            const buffer = await(await conn.getFile(input.split(" ")[0])).data;
            const buffer2 = await(await conn.getFile(input.split(" ")[1])).data;
            const imagePath = './tmp/image.jpg';
            const imagePath2 = './tmp/image2.jpg';
            fs.writeFileSync(imagePath, buffer);
            fs.writeFileSync(imagePath2, buffer2);
            const output = await photofunImg2(result.link, fs.readFileSync(imagePath), fs.readFileSync(imagePath2));
            await conn.sendFile(m.chat, output.url || result.thumb, '', message, m);
            fs.unlinkSync(imagePath);
            fs.unlinkSync(imagePath2);
            } else if (effect[0].inputs.length == 1) {
            const buffer = await(await conn.getFile(input)).data;
            const imagePath = './tmp/image.jpg';
            fs.writeFileSync(imagePath, buffer);
            const output = await photofunImg(result.link, fs.readFileSync(imagePath));
            await conn.sendFile(m.chat, output.url || result.thumb, '', message, m);
            fs.unlinkSync(imagePath);
            } else {
            await m.reply("Ada yang salah");
            }
          } else {
            await m.reply("Masukkan " + effect[0].inputs.length + " link gambar di akhir dengan pemisah spasi.");
          }
        } else if (effect[0].inputs[0].input == 'text') {
          if (input) {
            const output = await photofunText(result.link, input.split("-"));
            await conn.sendFile(m.chat, output.url || result.thumb, '', message, m);
          } else {
            await m.reply("Masukkan " + effect[0].inputs.length + " teks Anda di akhir dengan pemisah simbol -.");
          }
        }
      } else if (!part) {
        const listMessage = data.map((post, index) => `*${index + 1}.* ${post.judul}`).join('\n');
        const helpMessage = `\n\n📚 Contoh penggunaan: *photofunia query|page|part*`;
        conn.reply(m.chat, listMessage + helpMessage, m);
      } else {
        conn.reply(m.chat, '❌ Nomor bagian tidak valid. Harap masukkan nomor bagian yang tepat.\n\n📚 Contoh penggunaan: *photofunia query|page|part*', m);
      }
    } else {
      conn.reply(m.chat, '📭 Tidak ada hasil yang ditemukan.', m);
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    conn.reply(m.chat, '❌ Terjadi kesalahan saat mengambil data. Pastikan format input benar.\n\n📚 Contoh penggunaan: *photofunia query|page|part*', m);
  }
};

handler.help = ['photofunia'].map(v => v + ' query|page|part');
handler.tags = ['internet'];
handler.command = /^(photofunia)$/i;

export default handler;