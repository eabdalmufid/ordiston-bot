import {
    generateWAMessageFromContent
} from '@adiwajshing/baileys'
import * as fs from 'fs'

let handler = async (m, {
    conn,
    text,
    participants,
    isOwner,
    isAdmin
}) => {

    try {
        let users = participants.map(u => conn.decodeJid(u.id))
        let q = m.quoted ? m.quoted : m || m.text || m.sender
        let c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender
        let msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, {
            [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : {
                text: '' || c
            }
        }, {
            quoted: null,
            ephemeralExpiration: ephemeral,
            userJid: conn.user.id
        }), text || q.text, conn.user.jid, {
            mentions: users
        })

        await conn.relayMessage(m.chat, msg.message, {
            messageId: msg.key.id
        })

    } catch {
        /**
        [ By @NeKosmic || https://github.com/NeKosmic/ ]
        **/

        let users = participants.map(u => conn.decodeJid(u.id))
        let quoted = m.quoted ? m.quoted : m
        let mime = (quoted.msg || quoted).mimetype || ''
        let isMedia = /image|video|sticker|audio/.test(mime)
        let more = String.fromCharCode(8206)
        let masss = more.repeat(850)
        let htextos = `${text ? text : "*Halo :D*"}`

        if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
            var mediax = await quoted.download?.()
            conn.sendMessage(m.chat, {
                image: mediax,
                mentions: users,
                caption: htextos,
                mentions: users
            }, {
                quoted: null,
                ephemeralExpiration: ephemeral
            })
        } else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
            var mediax = await quoted.download?.()
            conn.sendMessage(m.chat, {
                video: mediax,
                mentions: users,
                mimetype: 'video/mp4',
                caption: htextos
            }, {
                quoted: null,
                ephemeralExpiration: ephemeral
            })
        } else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
            var mediax = await quoted.download?.()
            conn.sendMessage(m.chat, {
                audio: mediax,
                mentions: users,
                mimetype: 'audio/mp4',
                fileName: `Hidetag.mp3`
            }, {
                quoted: null,
                ephemeralExpiration: ephemeral
            })
        } else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
            var mediax = await quoted.download?.()
            conn.sendMessage(m.chat, {
                sticker: mediax,
                mentions: users
            }, {
                quoted: null,
                ephemeralExpiration: ephemeral
            })
        } else {
            await conn.relayMessage(m.chat, {
                extendedTextMessage: {
                    text: `${masss}\n${htextos}\n`,
                    ...{
                        contextInfo: {
                            mentionedJid: users,
                            externalAdReply: {
                                thumbnail: 'https://raw.githubusercontent.com/abclimadasar/silence/master/thumbnail.jpg',
                                sourceUrl: 'https://github.com/eabdalmufid'
                            }
                        }
                    }
                }
            }, {})

        }
    }
}

handler.help = ['pengumuman', 'announce', 'hidetag'].map(v => v + ' [teks]')
//handler.help = ['hidetag <pesan>']
handler.tags = ['group']
handler.command = ['pengumuman', 'announce', 'hidetag']
handler.admin = true
handler.group = true

export default handler

