import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
   let res = await fetch('https://api.github.com/repos/eabdalmufid/eabdalmufid')
   let json = await res.json()
   let txt = `*乂  B O T  -  S C R I P T*\n\n`
      txt += `	◦  *Name* : ${json.name}\n`
      txt += `	◦  *Visitor* : ${json.watchers_count}\n`
      txt += `	◦  *Size* : ${(json.size / 1024).toFixed(2)} MB\n`
      txt += `	◦  *Updated* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`
      txt += `	◦  *Url* : ${json.html_url}\n\n`
      txt += `	   ${json.forks_count} Forks · ${json.stargazers_count} Stars · ${json.open_issues_count} Issues\n\n`
      txt += author
   await conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'INR',
      amount1000: fsizedoc,
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
handler.help = ['scbot']
handler.tags = ['info']
handler.command = /^sc(ript(bot)?|bot)?$/i
export default handler
