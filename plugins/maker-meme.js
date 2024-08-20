import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, command }) => {

  let urut = text.split`|`
  let text1 = urut[0]
  let text2 = urut[1]
  let text3 = urut[2]
  
if (command == 'meme1') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} samsung`
let caption = `Nihh banh ${command} nya`
let url = `https://api.lolhuman.xyz/api/meme1?apikey=${global.lolkey}&text=${text}`
await conn.sendHydrated(m.chat, caption, wm, url, null, null, null, null, [
      ['Meme4', usedPrefix + 'meme4 ' + text],
      ['Meme2', usedPrefix + 'meme2 ' + text],
      ['Meme9', usedPrefix + 'meme9 ' + text]
    ], m)
    let stiker = await sticker(null, global.API(url), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
}

if (command == 'meme4') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} samsung`
let caption = `Nihh banh ${command} nya`
let url = `https://api.lolhuman.xyz/api/meme4?apikey=${global.lolkey}&text=${text}`
await conn.sendHydrated(m.chat, caption, wm, url, null, null, null, null, [
      ['Meme1', usedPrefix + 'meme1 ' + text],
      ['Meme2', usedPrefix + 'meme2 ' + text],
      ['Meme9', usedPrefix + 'meme9 ' + text]
    ], m)
    let stiker = await sticker(null, global.API(url), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
}

if (command == 'meme5') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} samsung`
let caption = `Nihh banh ${command} nya`
let url = `https://api.lolhuman.xyz/api/meme5?apikey=${global.lolkey}&text=${text}`
await conn.sendHydrated(m.chat, caption, wm, url, null, null, null, null, [
      ['Meme1', usedPrefix + 'meme1 ' + text],
      ['Meme2', usedPrefix + 'meme2 ' + text],
      ['Meme9', usedPrefix + 'meme9 ' + text]
    ], m)
    let stiker = await sticker(null, global.API(url), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
}

if (command == 'meme9') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} samsung`
let caption = `Nihh banh ${command} nya`
let url = `https://api.lolhuman.xyz/api/creator/kannagen?apikey=${global.lolkey}&text=${text}`
await conn.sendHydrated(m.chat, caption, wm, url, null, null, null, null, [
      ['Meme1', usedPrefix + 'meme1 ' + text],
      ['Meme2', usedPrefix + 'meme2 ' + text],
      ['Meme4', usedPrefix + 'meme4 ' + text]
    ], m)
    let stiker = await sticker(null, global.API(url), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
}

if (command == 'meme10') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} samsung`
let caption = `Nihh banh ${command} nya`
let url = `https://api.lolhuman.xyz/api/creator/ohno?apikey=${global.lolkey}&text=${text}`
await conn.sendHydrated(m.chat, caption, wm, url, null, null, null, null, [
      ['Meme1', usedPrefix + 'meme1 ' + text],
      ['Meme2', usedPrefix + 'meme2 ' + text],
      ['Meme4', usedPrefix + 'meme4 ' + text]
    ], m)
    let stiker = await sticker(null, global.API(url), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
}

if (command == 'meme11') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} samsung`
let caption = `Nihh banh ${command} nya`
let url = `https://api.lolhuman.xyz/api/creator/changemymind?apikey=${global.lolkey}&text=${text}`
await conn.sendHydrated(m.chat, caption, wm, url, null, null, null, null, [
      ['Meme1', usedPrefix + 'meme1 ' + text],
      ['Meme2', usedPrefix + 'meme2 ' + text],
      ['Meme4', usedPrefix + 'meme4 ' + text]
    ], m)
    let stiker = await sticker(null, global.API(url), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
}

if (command == 'meme2') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} sam|sung`
let caption = `Nihh banh ${command} nya`
let url = `https://api.lolhuman.xyz/api/meme2?apikey=${global.lolkey}&text1=${text1}&text2=${text2}`
await conn.sendHydrated(m.chat, caption, wm, url, null, null, null, null, [
      ['Meme7', usedPrefix + 'meme7 ' + text1 + '|' + text],
      ['Meme8', usedPrefix + 'meme8 ' + text1 + '|' + text]
    ], m)
    let stiker = await sticker(null, global.API(url), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
}

if (command == 'meme7') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} sam|sung`
let caption = `Nihh banh ${command} nya`
let url = `https://api.lolhuman.xyz/api/meme7?apikey=${global.lolkey}&text1=${text1}&text2=${text2}`
await conn.sendHydrated(m.chat, caption, wm, url, null, null, null, null, [
      ['Meme2', usedPrefix + 'meme2 ' + text1 + '|' + text],
      ['Meme8', usedPrefix + 'meme8 ' + text1 + '|' + text]
    ], m)
    let stiker = await sticker(null, global.API(url), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
}

if (command == 'meme8') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} sam|sung`
let caption = `Nihh banh ${command} nya`
let url = `https://api.lolhuman.xyz/api/meme8?apikey=${global.lolkey}&text1=${text1}&text2=${text2}`
await conn.sendHydrated(m.chat, caption, wm, url, null, null, null, null, [
      ['Meme2', usedPrefix + 'meme2 ' + text1 + '|' + text],
      ['Meme7', usedPrefix + 'meme7 ' + text1 + '|' + text]
    ], m)
    let stiker = await sticker(null, global.API(url), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
}

if (command == 'meme3') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} sam|sung|seng`
let caption = `Nihh banh ${command} nya`
let url = `https://api.lolhuman.xyz/api/meme3?apikey=${global.lolkey}&text1=${text1}&text2=${text2}&text3=${text3}`
await conn.sendHydrated(m.chat, caption, wm, url, null, null, null, null, [
      ['Meme6', usedPrefix + 'meme6 ' + text1 + '|' + text + '|' + text]
    ], m)
    let stiker = await sticker(null, global.API(url), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
}

if (command == 'meme6') {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} sam|sung|seng`
let caption = `Nihh banh ${command} nya`
let url = `https://api.lolhuman.xyz/api/meme6?apikey=${global.lolkey}&text1=${text1}&text2=${text2}&text3=${text3}`
await conn.sendHydrated(m.chat, caption, wm, url, null, null, null, null, [
      ['Meme3', usedPrefix + 'meme3 ' + text1 + '|' + text + '|' + text]
    ], m)
    let stiker = await sticker(null, global.API(url), global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
}

}
handler.help = ['meme 1-11']
handler.command = /^meme(1[01]|1|[2-9])$/i
handler.tags = ['maker']

export default handler