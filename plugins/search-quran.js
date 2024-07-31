import fetch from "node-fetch"
let handler = async (m, {
    conn,
    usedPrefix,
    text,
    args,
    command
}) => {
    let spas = "                "
    let lister = [
        "a",
"aa",
"b",
"bb",
"c",
"cc",
"d",
"dd",
"e",
"ee",
"f",
"ff",
"g",
"gg",
"h",
"hh",
"i",
"ii",
"j",
"jj",
"k",
"kk",
"l",
"ll",
"m",
"mm",
"n",
"nn",
"o",
"p",
"q",
"r",
"s",
"t",
"u",
"v",
"w",
"x",
"y",
"z"
    ]
    let [feature, querys, equerys] = text.split(/[^\w\s]/g)
    if (!lister.includes(feature)) return m.reply("*Example:*\n.quransearch api\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))
    if (lister.includes(feature)) {
            if (!querys) return m.reply("Input Query!")
            await m.reply(wait)
            
            if (feature == "a") {
            let data = await aQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "aa") {
            let data = await aaQuran(querys, equerys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "b") {
            let data = await bQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "bb") {
            let data = await bbQuran(querys, equerys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "c") {
            let data = await cQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "cc") {
            let data = await ccQuran(querys, equerys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "d") {
            let data = await dQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "dd") {
            let data = await ddQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "e") {
            let data = await eQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "ee") {
            let data = await eeQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "f") {
            let data = await fQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "ff") {
            let data = await ffQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "g") {
            let data = await gQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "gg") {
            let data = await ggQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "h") {
            let data = await hQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "hh") {
            let data = await hhQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "i") {
            let data = await iQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "ii") {
            let data = await iiQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "j") {
            let data = await jQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "jj") {
            let data = await jjQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "k") {
            let data = await kQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "kk") {
            let data = await kkQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "l") {
            let data = await lQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "ll") {
            let data = await llQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "m") {
            let data = await mQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "mm") {
            let data = await mmQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "n") {
            let data = await nQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "nn") {
            let data = await nnQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "o") {
            let data = await oQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "p") {
            let data = await pQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "q") {
            let data = await qQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "r") {
            let data = await rQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "s") {
            let data = await sQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "t") {
            let data = await tQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "u") {
            let data = await uQuran()
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "v") {
            let data = await vQuran(querys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "w") {
            let data = await wQuran(querys, equerys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "x") {
            let data = await xQuran(querys, equerys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "y") {
            let data = await yQuran(querys, equerys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            if (feature == "z") {
            let data = await zQuran(querys, equerys)
            let capt = await formatData(data)
            await conn.reply(m.chat, `*${htki} 📺 quransearch Search 🔎 ${htka}*
${capt}`, m)
            }
            
    }
}
handler.help = ["quransearch"]
handler.tags = ["search"]
handler.command = /^(quransearch)$/i
export default handler

function formatData(data) {
  let output = '';
  let dataArray = Array.isArray(data) ? data : [data];
  
  dataArray.forEach((item, index) => {
    output += `*[ Result ${index + 1} ]*\n`;
    Object.keys(item).forEach(key => {
      output += ` *${key}:* `;
      if (typeof item[key] === 'object' && item[key] !== null) {
        Object.keys(item[key]).forEach(subKey => {
          output += `\n *${subKey}:* ${item[key][subKey]}`;
        });
      } else {
        output += ` ${item[key]}\n`;
      }
    });
  });

  return output;
}


async function aQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/chapters?language=id`);
  const data = await response.json();
  return  data;
}


async function bQuran(id) {
  const response = await fetch(`https://api.quran.com/api/v4/chapters/${id}?language=id`);
  const data = await response.json();
  return  data;
}


async function cQuran(chapter_id) {
  const response = await fetch(`https://api.quran.com/api/v4/chapters/${chapter_id}/info?language=id`);
  const data = await response.json();
  return  data;
}


async function dQuran(chapter_number) {
  const response = await fetch(`https://api.quran.com/api/v4/verses/by_chapter/${chapter_number}?language=id`);
  const data = await response.json();
  return  data;
}


async function eQuran(page_number) {
  const response = await fetch(`https://api.quran.com/api/v4/verses/by_page/${page_number}?language=id`);
  const data = await response.json();
  return  data;
}


async function fQuran(juz_number) {
  const response = await fetch(`https://api.quran.com/api/v4/verses/by_juz/${juz_number}?language=id`);
  const data = await response.json();
  return  data;
}


async function gQuran(hizb_number) {
  const response = await fetch(`https://api.quran.com/api/v4/verses/by_hizb/${hizb_number}?language=id`);
  const data = await response.json();
  return  data;
}


async function hQuran(rub_number) {
  const response = await fetch(`https://api.quran.com/api/v4/verses/by_rub/${rub_number}?language=id`);
  const data = await response.json();
  return  data;
}


async function iQuran(verse_key) {
  const response = await fetch(`https://api.quran.com/api/v4/verses/by_key/${verse_key}?language=id`);
  const data = await response.json();
  return  data;
}


async function jQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/verses/random?language=id`);
  const data = await response.json();
  return  data;
}


async function kQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/juzs`);
  const data = await response.json();
  return  data;
}


async function lQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/quran/verses/indopak`);
  const data = await response.json();
  return  data;
}


async function mQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani`);
  const data = await response.json();
  return  data;
}


async function nQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani_simple`);
  const data = await response.json();
  return  data;
}


async function oQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani_tajweed`);
  const data = await response.json();
  return  data;
}


async function pQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/quran/verses/imlaei`);
  const data = await response.json();
  return  data;
}


async function qQuran(recitation_id) {
  const response = await fetch(`https://api.quran.com/api/v4/quran/recitations/${recitation_id}`);
  const data = await response.json();
  return  data;
}


async function rQuran(translation_id) {
  const response = await fetch(`https://api.quran.com/api/v4/quran/translations/${translation_id}`);
  const data = await response.json();
  return  data;
}


async function sQuran(tafsir_id) {
  const response = await fetch(`https://api.quran.com/api/v4/quran/tafsirs/${tafsir_id}`);
  const data = await response.json();
  return  data;
}


async function tQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/quran/verses/code_v1`);
  const data = await response.json();
  return  data;
}


async function uQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/quran/verses/code_v2`);
  const data = await response.json();
  return  data;
}


async function vQuran(id) {
  const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${id}?language=id`);
  const data = await response.json();
  return  data;
}


async function wQuran(id, chapter_number) {
  const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${id}/${chapter_number}`);
  const data = await response.json();
  return  data;
}


async function xQuran(recitation_id, chapter_number) {
  const response = await fetch(`https://api.quran.com/api/v4/recitations/${recitation_id}/by_chapter/${chapter_number}`);
  const data = await response.json();
  return  data;
}


async function yQuran(recitation_id, juz_number) {
  const response = await fetch(`https://api.quran.com/api/v4/recitations/${recitation_id}/by_juz/${juz_number}`);
  const data = await response.json();
  return  data;
}


async function zQuran(recitation_id, page_number) {
  const response = await fetch(`https://api.quran.com/api/v4/recitations/${recitation_id}/by_page/${page_number}`);
  const data = await response.json();
  return  data;
}


async function aaQuran(recitation_id, rub_number) {
  const response = await fetch(`https://api.quran.com/api/v4/recitations/${recitation_id}/by_rub/${rub_number}`);
  const data = await response.json();
  return  data;
}


async function bbQuran(recitation_id, hizb_number) {
  const response = await fetch(`https://api.quran.com/api/v4/recitations/${recitation_id}/by_hizb/${hizb_number}`);
  const data = await response.json();
  return  data;
}


async function ccQuran(recitation_id, ayah_key) {
  const response = await fetch(`https://api.quran.com/api/v4/recitations/${recitation_id}/by_ayah/${ayah_key}`);
  const data = await response.json();
  return  data;
}


async function ddQuran(recitation_id) {
  const response = await fetch(`https://api.quran.com/api/v4/resources/recitations/${recitation_id}/info`);
  const data = await response.json();
  return  data;
}


async function eeQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/resources/translations`);
  const data = await response.json();
  return  data;
}


async function ffQuran(translation_id) {
  const response = await fetch(`https://api.quran.com/api/v4/resources/translations/${translation_id}/info`);
  const data = await response.json();
  return  data;
}


async function ggQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/resources/tafsirs?language=id`);
  const data = await response.json();
  return  data;
}


async function hhQuran(tafsir_id) {
  const response = await fetch(`https://api.quran.com/api/v4/resources/tafsirs/${tafsir_id}/info`);
  const data = await response.json();
  return  data;
}


async function iiQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/resources/recitation_styles`);
  const data = await response.json();
  return  data;
}


async function jjQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/resources/languages`);
  const data = await response.json();
  return  data;
}


async function kkQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/resources/chapter_infos`);
  const data = await response.json();
  return  data;
}


async function llQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/resources/verse_media`);
  const data = await response.json();
  return  data;
}


async function mmQuran() {
  const response = await fetch(`https://api.quran.com/api/v4/resources/chapter_reciters?language=id`);
  const data = await response.json();
  return  data;
}


async function nnQuran(q) {
  const response = await fetch(`https://api.quran.com/api/v4/search?q=${q}&language=id`);
  const data = await response.json();
  return data;
}