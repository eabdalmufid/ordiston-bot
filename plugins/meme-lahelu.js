import fetch from "node-fetch";

const handler = async (m, { conn, text }) => {
  const parts = text.trim().split("|").map(item => item.trim());

  if (parts.length < 1) {
    conn.reply(m.chat, '📚 Contoh penggunaan: *lahelu query|page|part*', m);
    return;
  }

  const query = parts[0];
  const page = parseInt(parts[1]) || 0;
  const part = parseInt(parts[2]) || 0;

  const url = `https://lahelu.com/api/post/get-search?query=${query}&page=${page}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.postInfos && data.postInfos.length > 0) {
      if (part > 0 && part <= data.postInfos.length) {
        const result = data.postInfos[part - 1];
        const message = `
📌 *Post ID:* ${result.postID}
👤 *User ID:* ${result.userID}
📜 *Title:* ${result.title}
👍 *Total Upvotes:* ${result.totalUpvotes}
👎 *Total Downvotes:* ${result.totalDownvotes}
💬 *Total Comments:* ${result.totalComments}
⏰ *Create Time:* ${new Date(result.createTime).toLocaleString()}
🖼️ *Media:* ${result.media}
🚫 *Sensitive:* ${result.sensitive ? 'Yes' : 'No'}
🧑‍💼 *User Username:* ${result.userUsername}
\n📚 Contoh penggunaan: *lahelu query|page|part*`;
        await conn.sendFile(m.chat, 'https://cache.lahelu.com/' + result.media, '', message, m);
      } else if (page > 0) {
        const listMessage = data.postInfos
          .map((post, index) => `*${index + 1}.* ${post.title}`)
          .join('\n');
        const helpMessage = `\n\n📚 Contoh penggunaan: *lahelu query|page|part*`;
        conn.reply(m.chat, listMessage + helpMessage, m);
      } else {
        conn.reply(m.chat, '❌ Nomor bagian tidak valid. Harap masukkan nomor bagian yang tepat.\n\n📚 Contoh penggunaan: *lahelu query|page|part*', m);
      }
    } else {
      conn.reply(m.chat, '📭 Tidak ada hasil yang ditemukan.', m);
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    conn.reply(m.chat, '❌ Terjadi kesalahan saat mengambil data. Pastikan format input benar.\n\n📚 Contoh penggunaan: *lahelu query|page|part*', m);
  }
}

handler.help = ['lahelu'].map(v => v + ' query|page|part');
handler.tags = ['internet'];
handler.command = /^(lahelu)$/i;

export default handler;