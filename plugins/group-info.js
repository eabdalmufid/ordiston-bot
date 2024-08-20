let handler = async (m, { conn, participants, groupMetadata }) => {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
    const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, antiDelete, antiBot, antiVideo, antiFoto, antiSticker, antiToxic, simi } = global.db.data.chats[m.chat]
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
    let text = `*「 Group Information 」*\n
*ID Grup:* 
${groupMetadata.id}

*Nama Grup:* 
${groupMetadata.subject}

*Deskripsi Grup:* 
${groupMetadata.desc?.toString() || 'Tidak Ada'}

*Total Member:*
${participants.length} Member

*Owner Grup:* 
@${owner.split('@')[0]}

*Admin Grup:*
${listAdmin}

*Pengaturan Group:*

Chat Banned: ${isBanned ? 'Aktif' : 'Nonaktif'}
Welcome: ${welcome ? 'Aktif' : 'Nonaktif'}
Simi: ${simi ? 'Aktif' : 'Nonaktif'}
Anti Bot: ${antiBot ? 'Aktif' : 'Nonaktif'}
Anti Delete: ${antiDelete ? 'Nonaktif' : 'Aktif'}
Anti Link: ${antiLink ? 'Aktif' : 'Nonaktif'}
Anti Foto: ${antiFoto ? 'Aktif' : 'Nonaktif'}
Anti Video: ${antiVideo ? 'Aktif' : 'Nonaktif'}
Anti Sticker: ${antiSticker ? 'Aktif' : 'Nonaktif'}
Anti Toxic: ${antiToxic ? 'Aktif' : 'Nonaktif'}
`.trim()
    conn.sendFile(m.chat, pp, 'pp.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}

handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(gro?upinfo|info(gro?up|gc))$/i

handler.group = true

export default handler