let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    if (!who) throw 'Tag orang yang akan diberhentikan sebagai Owner!'
    const ownerID = who.split('@')[0];
    
    if (!global.owner.some(owner => owner[0] === ownerID)) throw 'Orang ini tidak menjadi owner!';
    
    const index = global.owner.findIndex(owner => owner[0] === ownerID);
    global.owner.splice(index, 1);
    
    const caption = `Sekarang @${ownerID} diberhentikan sebagai Owner!`
    await conn.reply(m.chat, caption, m, {
        mentions: conn.parseMention(caption)
    });
}
handler.help = ['delowner @user']
handler.tags = ['owner']
handler.command = /^(remove|hapus|-|del)owner$/i
handler.owner = true

export default handler