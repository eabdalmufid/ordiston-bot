
let handler = async (m, { conn, usedPrefix, command }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) return await conn.sendButton(m.chat, `Tidak ada voting digrup ini!`, author, null, [
    ['Up Vote', usedPrefix + 'upvote']
], m)

if (conn.vote[id][1].concat(conn.vote[id][2]).includes(m.sender)) throw 'Kamu sudah vote!'
    if (/up/i.test(command)) {
        conn.vote[id][1].push(m.sender)
    } else if (/de/i.test(command)) {
        conn.vote[id][2].push(m.sender)
    }
    
    let [reason, upvote, devote] = conn.vote[id]
    let caption = `*${htjava} DAFTAR VOTE ${htjava}*
*Alasan:* ${reason}

*${htjava} UPVOTE ${htjava}*
*Total:* ${upvote.length}
${dmenut}
${upvote.map((v, i) => `${dmenub} ${i + 1}.  @${v.split`@`[0]}`).join('\n')}
${dmenuf}

*${htjava} DEVOTE ${htjava}*
*Total:* ${devote.length}
${dmenut}
${devote.map((v, i) => `${dmenub} ${i + 1}.  @${v.split`@`[0]}`).join('\n')} 
${dmenuf}
`.trim()
await conn.sendButton(m.chat, caption, author, null, [
        ['Up Vote', usedPrefix + 'upvote'],
        ['De Vote', usedPrefix + 'devote']
    ], m, { mentions: conn.parseMention(caption) })
    
}
handler.help = ['upvote', 'devote']
handler.tags = ['vote']
handler.command = /^(up|de)vote$/i

export default handler