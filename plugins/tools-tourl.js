import uploadFile from "../lib/uploadFile.js";
import uploadImage from "../lib/uploadImage.js";
import fetch from "node-fetch";

let handler = async (m, { args, usedPrefix, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let name = await conn.getName(who);
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw "No media found";
  let media = await q.download();
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
  let link = await (isTele ? uploadImage : uploadFile)(media);
  let caption = `📮 *L I N K :*
${link}
📊 *S I Z E :* ${formatBytes(media.length)}
📛 *E x p i r e d :* ${isTele ? "No Expiry Date" : "Unknown"}

*S H O R T :* ${await shortUrl(link)}`;

  conn.reply(m.chat, caption, m, {
    contextInfo: {
      externalAdReply: {
        title: "Hai, " + name,
        body: botdate,
        mediaType: 1,
        thumbnail: await (await fetch(link)).buffer(),
        thumbnailUrl: link,
        renderLargerThumbnail: true,
        sourceUrl: link,
        mediaUrl: link,
      },
    },
  });
};
handler.help = ["upload", "tourl"];
handler.tags = ["tools"];
handler.command = /^(tourl|upload)$/i;
handler.limit = true;
export default handler;

function formatBytes(bytes) {
  if (bytes === 0) {
    return '0 B';
  }
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
  return await res.text();
}
