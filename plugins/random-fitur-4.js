import fetch from 'node-fetch'

let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, command }) => {

if (command == 'quotable') {
let res = await fetch(`https://api.quotable.io/random`)
  let x = await res.json()
  await conn.sendButton(m.chat, `*Quotes:*
  ${x.content}
  
  *Author:* ${x.author}
  *Date Added:* ${x.dateAdded}
  *Date Modif:* ${x.dateModified}
  *Id:* ${x._id}`, wm, null, [
                ['Next', `${usedPrefix + command}`],
                ['Translate', `${usedPrefix}tr id ${x.content}`]
            ], m)
}

if (command == 'inspiration') {
let res = await fetch(`https://api.goprogram.ai/inspiration`)
  let x = await res.json()
  await conn.sendButton(m.chat, `*Quotes:*
  ${x.quote}
  
  *Author:* ${x.author}`, wm, null, [
                ['Next', `${usedPrefix + command}`],
                ['Translate', `${usedPrefix}tr id ${x.quote}`]
            ], m)
}

if (command == 'artinama') {
let res = await fetch(`https://api.lolhuman.xyz/api/artinama?apikey=${global.lolkey}&nama=${text}`)
  let x = await res.json()
  await conn.sendButton(m.chat, `*Artinama:*
  ${x.result}`, wm, null, [
                ['Next', `${usedPrefix + command}`],
                ['Translate', `${usedPrefix}tr id ${x.result}`]
            ], m)
}

}
handler.command = handler.help = ['quotable', 'inspiration', 'artinama']
handler.tags = ['quotes']

export default handler