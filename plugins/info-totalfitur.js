let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const tags = Object.values(global.plugins)
      .flatMap(p => p.help ? p.tags : [])
      .filter(tag => tag != undefined && tag.trim() !== '');

    const counts = tags.reduce((c, tag) => {
      c[tag] = (c[tag] || 0) + 1;
      return c;
    }, {});

    const tagList = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => `⭔ ${(tag.charAt(0).toUpperCase() + tag.slice(1)).padEnd(13)} - ${count.toString().padStart(3)}`)
      .join('\n');

    const totalCommands = Object.values(counts).reduce((a, b) => a + b, 0);
    const responseText = "```" + `${tagList}\n` + "```";

    await conn.reply(m.chat, `*[ FEATURE LIST ]*\n\n${responseText}\n\n*Total fitur: ${totalCommands} Commands*`, m, adReply);
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Terjadi kesalahan dalam mengeksekusi perintah.', m, adReply);
  }
}

handler.help = ['totalfitur']
handler.tags = ['main', 'info']
handler.command = /^(feature|totalfitur)$/i
export default handler

/*import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
let handler = async (m, { conn, text, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length
let txt = `*乂  B O T  -  F E A T U R E*\n\n`
      txt += `	◦  *Total* : ${totalf}\n`
      txt += author
   await conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'USD',
      amount1000: totalf * 1000,
      requestFrom: '0@s.whatsapp.net',
      noteMessage: {
      extendedTextMessage: {
      text: txt,
      contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})
}
handler.help = ['totalfitur']
handler.tags = ['main','info']
handler.command = /^(feature|totalfitur)$/i
export default handler*/