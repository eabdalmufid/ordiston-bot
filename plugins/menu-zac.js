import axios from 'axios'
import FormData from 'form-data'
import fetch from 'node-fetch'
import fs from 'fs'

let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, isPrems, isOwner, command }) => {
let imgr = flaaa


let urut = text.split`|`
  let one = urut[1]
  let two = urut[2]
  let three = urut[3]
  
let template = (args[0] || '').toLowerCase()
if (!args[0] || !one) {
let caption = `*Contoh Penggunaan Single*
${usedPrefix + command} cecan

*Contoh Penggunaan Multi*
${usedPrefix + command} pinterest |wibu

*List:*
${usedPrefix + command} alphacoders
${usedPrefix + command} cecan
${usedPrefix + command} cerpen
${usedPrefix + command} china
${usedPrefix + command} cosplay
${usedPrefix + command} dare
${usedPrefix + command} darkjokes
${usedPrefix + command} faktaunik
${usedPrefix + command} fml
${usedPrefix + command} google
${usedPrefix + command} hijaber
${usedPrefix + command} hmod
${usedPrefix + command} husbu
${usedPrefix + command} indonesia
${usedPrefix + command} japan
${usedPrefix + command} katagalau
${usedPrefix + command} konachan
${usedPrefix + command} korea
${usedPrefix + command} loli
${usedPrefix + command} loli
${usedPrefix + command} malaysia
${usedPrefix + command} meme
${usedPrefix + command} milf
${usedPrefix + command} pinterest
${usedPrefix + command} ppcouple
${usedPrefix + command} quotes
${usedPrefix + command} quotesanime
${usedPrefix + command} random
${usedPrefix + command} santuy
${usedPrefix + command} sstick
${usedPrefix + command} thailand
${usedPrefix + command} truth
${usedPrefix + command} ukhty
${usedPrefix + command} vietnam
${usedPrefix + command} waifu
${usedPrefix + command} wallpapercave
${usedPrefix + command} wiki
`
await conn.sendButtonVid(m.chat, logo, caption, 'Nih.mp4', 'Back', '.menulist', fakes, adReply)
            }
            
try {
if (command) {
switch (template) {

        case 'cecan':
case 'china':
case 'hijaber':
case 'indonesia':
case 'japan':
case 'korea':
case 'loli':
case 'malaysia':
case 'random':
case 'santuy':
case 'thailand':
case 'ukhty':
case 'vietnam':
        let as = `https://api.zacros.my.id/asupan/${args[0]}`
        let ass = `*Result:* ${args[0]}`
        await conn.sendButton(m.chat, ass, wm, as, [
                ['Next', `${usedPrefix + command} ${args[0]}`]
            ], m, { quoted: fakes })
            break
            case 'alphacoders':
            case 'wallpapercave':
            case 'konachan':
        let wl = `https://api.zacros.my.id/search/${args[0]}?query=${one}`
        let wll = `*Result:* ${args[0]}`
        await conn.sendButton(m.chat, wll, wm, wl, [
                ['Next', `${usedPrefix + command} ${args[0]}`]
            ], m, { quoted: fakes })
            break
            case 'pinterest':
        let pn = await fetch(`https://api.zacros.my.id/search/pinterest?query=${one}`)
        let pnn = await pn.json()
        let pnnn = pnn.result
        let pnnnn = `*Result:* ${one}`
        await conn.sendButton(m.chat, pnnnn, wm, pnnn.getRandom(), [
                ['Next', `${usedPrefix + command} ${one}`]
            ], m, { quoted: fakes })
            break
            case 'sstick':
        let sp = await fetch(`https://api.zacros.my.id/search/sticker?query=${one}`)
        let spp = await sp.json()
        let sppp = `*Result:* ${spp.result[0].title}
        ${spp.result[0].url}
`
        await conn.sendButton(m.chat, sppp, wm, null, [
                ['Next', `${usedPrefix + command} ${one}`]
            ], m, { quoted: fakes })
            break
            case 'google':
        let go = await fetch(`https://api.zacros.my.id/search/google?query=${one}`)
        let goo = await go.json()
        let gooo = `*Result:* ${goo.result[0].title}
        ${goo.result[0].link}
`
        await conn.sendButton(m.chat, gooo, wm, null, [
                ['Next', `${usedPrefix + command} ${one}`]
            ], m, { quoted: fakes })
            break
            case 'hmod':
        let hm = await fetch(`https://api.zacros.my.id/search/google?query=${one}`)
        let hmm = await hm.json()
        let hmmm = `*Result:* ${hmm.result[0].title}
        ${hmm.result[0].link}
`
        await conn.sendButton(m.chat, hmmm, wm, hmm.icon, [
                ['Next', `${usedPrefix + command} ${one}`]
            ], m, { quoted: fakes })
            break
            case 'wiki':
        let wk = await fetch(`https://api.zacros.my.id/search/google?query=${one}`)
        let wkk = await wk.json()
        let wkkk = `*Result:* ${wkk.result[0].wiki}
        ${wkk.result[0].judul}
`
        await conn.sendButton(m.chat, wkkk, wm, wkk.thumb, [
                ['Next', `${usedPrefix + command} ${one}`]
            ], m, { quoted: fakes })
            break
            case 'milf':
            case 'waifu':
            case 'husbu':
            case 'loli':
            case 'cosplay':
            case 'darkjokes':
            case 'meme':
        let rimg = `https://api.zacros.my.id/randomimg/${args[0]}`
        let riimg = `*Result:* ${args[0]}
`
        await conn.sendButton(m.chat, riimg, wm, rimg, [
                ['Next', `${usedPrefix + command} ${args[0]}`]
            ], m, { quoted: fakes })
            break
            case 'ppcouple':
        let pp = await fetch(`https://api.zacros.my.id/randomimg/${args[0]}`)
        let ppc = await pp.json()
        let cwo = `*Cwok:* ${args[0]}`
        await conn.sendButton(m.chat, cwo, wm, ppc.male, [
                ['Next', `${usedPrefix + command} ${args[0]}`]
            ], m, { quoted: fakes })
            let cwe = `*Cwok:* ${args[0]}`
        await conn.sendButton(m.chat, cwe, wm, ppc.female, [
                ['Next', `${usedPrefix + command} ${args[0]}`]
            ], m, { quoted: fakes })
            break
            case 'quotes':
            let qt = await fetch(`https://api.zacros.my.id/randomtext/quotes`)
        let qtt = await qt.json()
        let qttt = `*Result:* ${qtt.result.quotes}
        ${qtt.result.author}
`
        await conn.sendButton(m.chat, qttt, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
            case 'quotesanime':
        let qm = await fetch(`https://api.zacros.my.id/randomtext/quotesanime`)
        let qmm = await qm.json()
        let qmmm = `*Result:* ${qmm.result.char_name}
        ${qmm.result.anime}
        ${qmm.result.quotes}
        ${qmm.result.episode}
`
        await conn.sendButton(m.chat, qmmm, qmm.result.date, qmm.result.img, [
                ['Next', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
            case 'faktaunik':
            case 'fml':
            case 'cerpen':
            case 'katagalau':
            case 'truth':
            case 'dare':
        let fa = await fetch(`https://api.zacros.my.id/randomtext/${args[0]}`)
        let faa = await fa.json()
        let faaa = `*Result:* ${faa.result}`
        await conn.sendButton(m.chat, faaa, wm, null, [
                ['Next', `${usedPrefix + command}`]
            ], m, { quoted: fakes })
            break
}
}
} catch (e) {
throw eror
}
}
handler.help = ['zac <command> <teks>']
handler.tags = ['tools'] 
handler.command = /^zac$/i
export default handler