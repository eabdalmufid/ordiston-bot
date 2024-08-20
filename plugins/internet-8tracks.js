import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "users",
"artists",
"mixes",
"self",
"collections",
"play"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.8tracks self|hello\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "users") {
            if (!inputs) return m.reply("Input query link\nExample: .8tracks self|hello")
            await m.reply(wait)
            try {
                let item = await search8Tracks(inputs, "users")
                let teks = `🔍 *[ RESULT ]*

🔗 *Name:* ${item['mix_set']['name'] || 'Tidak diketahui'}
📝 *Path:* ${item['mix_set']['path'] || 'Tidak diketahui'}
👨‍💻 *Collection:* ${item['sponsored_collection']['path'] || 'Tidak diketahui'}
📅 *Description:* ${cleanText(item['sponsored_collection']['description']) || 'Tidak diketahui'}

*MIX:*
${item['sponsored_collection'].mixes.map((v, index) => '*ID:* ' + v.id + '\n*NAME:* ' + v.name).filter(v => v).join("\n") || 'Tidak diketahui'}
`
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "artists") {
            if (!inputs) return m.reply("Input query link\nExample: .8tracks self|hello")
            await m.reply(wait)
            try {
                let item = await search8Tracks(inputs, "artists")
                let teks = `🔍 *[ RESULT ]*

🔗 *Name:* ${item['mix_set']['name'] || 'Tidak diketahui'}
📝 *Path:* ${item['mix_set']['path'] || 'Tidak diketahui'}
👨‍💻 *Collection:* ${item['sponsored_collection']['path'] || 'Tidak diketahui'}
📅 *Description:* ${cleanText(item['sponsored_collection']['description']) || 'Tidak diketahui'}

*MIX:*
${item['sponsored_collection'].mixes.map((v, index) => '*ID:* ' + v.id + '\n*NAME:* ' + v.name).filter(v => v).join("\n") || 'Tidak diketahui'}
`
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }
        
        if (feature == "mixes") {
            if (!inputs) return m.reply("Input query link\nExample: .8tracks self|hello")
            await m.reply(wait)
            try {
                let item = await search8Tracks(inputs, "mixes")
                let teks = `🔍 *[ RESULT ]*

🔗 *Name:* ${item['mix_set']['name'] || 'Tidak diketahui'}
📝 *Path:* ${item['mix_set']['path'] || 'Tidak diketahui'}
👨‍💻 *Collection:* ${item['sponsored_collection']['path'] || 'Tidak diketahui'}
📅 *Description:* ${cleanText(item['sponsored_collection']['description']) || 'Tidak diketahui'}

*MIX:*
${item['sponsored_collection'].mixes.map((v, index) => '*ID:* ' + v.id + '\n*NAME:* ' + v.name).filter(v => v).join("\n") || 'Tidak diketahui'}
`
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (feature == "self") {
            if (!inputs) return m.reply("Input query link\nExample: .8tracks self|hello")
            await m.reply(wait)
            try {
                let item = await search8Tracks(inputs, "self")
                let teks = `🔍 *[ RESULT ]*

🔗 *Name:* ${item['mix_set']['name'] || 'Tidak diketahui'}
📝 *Path:* ${item['mix_set']['path'] || 'Tidak diketahui'}
👨‍💻 *Collection:* ${item['sponsored_collection']['path'] || 'Tidak diketahui'}
📅 *Description:* ${cleanText(item['sponsored_collection']['description']) || 'Tidak diketahui'}

*MIX:*
${item['sponsored_collection'].mixes.map((v, index) => '*ID:* ' + v.id + '\n*NAME:* ' + v.name).filter(v => v).join("\n") || 'Tidak diketahui'}
`
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (feature == "collections") {
            if (!inputs) return m.reply("Input query link\nExample: .8tracks self|hello")
            await m.reply(wait)
            try {
                let item = await search8Tracks(inputs, "collections")
                let teks = `🔍 *[ RESULT ]*

🔗 *Name:* ${item['mix_set']['name'] || 'Tidak diketahui'}
📝 *Path:* ${item['mix_set']['path'] || 'Tidak diketahui'}
👨‍💻 *Collection:* ${item['sponsored_collection']['path'] || 'Tidak diketahui'}
📅 *Description:* ${cleanText(item['sponsored_collection']['description']) || 'Tidak diketahui'}

*MIX:*
${item['sponsored_collection'].mixes.map((v, index) => '*ID:* ' + v.id + '\n*NAME:* ' + v.name).filter(v => v).join("\n") || 'Tidak diketahui'}
`
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (feature == "play") {
            if (!isNumberOnly(inputs)) return m.reply("Input query link\nExample: .8tracks self|hello")
            await m.reply(wait)
            try {
                let item = await play8Tracks(inputs)
                let teks = `🔍 *[ RESULT ]*

🔗 *Name:* ${item['set']['track']['name'] || 'Tidak diketahui'}
📝 *Performer:* ${item['set']['track']['performer'] || 'Tidak diketahui'}
👨‍💻 *ID:* ${item['set']['track']['id'] || 'Tidak diketahui'}
📅 *URL:* ${item['set']['track']['url'] || 'Tidak diketahui'}
`
                await m.reply(teks)
                        await conn.sendFile(m.chat, item['set']['track']['track_file_stream_url'] || logo, item['set']['track']['name'] || 'Tidak diketahui', "", m, false, {
            asDocument: true
        })
            } catch (e) {
                await m.reply(eror)
            }
        }
        
    }
}
handler.help = ["8tracks"]
handler.tags = ["internet"]
handler.command = /^(8tracks)$/i
export default handler

function cleanText(html) {
    const regex = /<[^>]+>/g;
    return html.replace(regex, "");
}
function isNumberOnly(input) {
  return /^\d+$/.test(input);
}

/* New Line */
async function search8Tracks(term, endpoint) {
  const url = `http://8tracks.com/search/${term}/${endpoint}?format=jsonh`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Lakukan sesuatu dengan data yang diterima
    return data;
  } catch (error) {
    console.log('Terjadi kesalahan:', error);
  }
}

async function play8Tracks(term) {
  const additionalEndpoint = `sets/${term}/play?player=sm&mix_id=${term}&format=jsonh`;
  
  try {
    const response = await fetch(`http://8tracks.com/${additionalEndpoint}`);
    const data = await response.json();
    
    // Lakukan sesuatu dengan data tambahan yang diterima
    return data;
  } catch (error) {
    console.log('Terjadi kesalahan:', error);
  }
}