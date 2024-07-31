import fetch from 'node-fetch'
import { Couples } from 'dhn-api'
let handler = async(m, { conn, text, usedPrefix, command }) => {
let x = await Couples()
await conn.sendFile(m.chat, x.female, "female", `*[ C E W E ]*`, m)
await conn.sendFile(m.chat, x.male, "male", `*[ C O W O ]*`, m)
}

handler.tags = ['fun']
handler.command = ['ppcp']

export default handler