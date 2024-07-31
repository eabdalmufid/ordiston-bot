import cheerio from 'cheerio'
import fetch from 'node-fetch'

let handler = async (m, {
    conn,
    usedPrefix,
    text,
    args,
    command
}) => {

    let lister = [
        "search",
        "info",
        "folders",
        "files"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.doodstream search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .doodstream search|query")
            try {
                const data = await doodstreamSearch(inputs)
                const resultList = data.result.map((file, index) => {
  return `${index + 1}. ${file.title} - File Code: ${file.file_code}`;
}).join("\n");

                await m.reply(resultList);
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "info") {
            if (!inputs) return m.reply("Input query link\nExample: .doodstream info|code")
            try {
                const data = await doodstreamInfo(inputs)
                const teks = data.result.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*
📰 *Title:* ${item.title}
🔗 *File Code:* ${item.filecode}
⏱️ *Length:* ${item.length}
🔗 *Protected Download:* ${item.protected_dl}
🖼️ *Single Image:* ${item.single_img}
▶️ *Can Play:* ${item.canplay}
👀 *Views:* ${item.views}
🌊 *Splash Image:* ${item.splash_img}
💾 *Size:* ${item.size}
🔗 *Protected Embed:* ${item.protected_embed}
📅 *Last View:* ${item.last_view}
⏳ *Uploaded:* ${item.uploaded}`;
                }).join("\n\n________________________\n\n");

                await m.reply(teks);
            } catch (e) {
                await m.reply(eror)
            }
        }
        
        if (feature == "folders") {
            if (!inputs) return m.reply("Input query link\nExample: .doodstream search|query")
            try {
                const data = await doodstreamFolders(inputs)
                const foldersList = data.result.folders.map((folder, index) => {
  return `${index + 1}. ${folder.name} (ID: ${folder.fld_id})`;
}).join("\n");
                await m.reply(foldersList);
            } catch (e) {
                await m.reply(eror)
            }
        }
        
        if (feature == "files") {
            if (!inputs) return m.reply("Input query link\nExample: .doodstream search|query")
            try {
                const data = await doodstreamFiles(inputs)
                const filesList = data.result.files.map((file, index) => {
  return `${index + 1}. ${file.title} - Download URL: ${file.download_url}`;
}).join("\n");
                await m.reply(filesList);
            } catch (e) {
                await m.reply(eror)
            }
        }
        
    }
}
handler.help = ['doodstream']
handler.tags = ['downloader']
handler.command = /^(doodstream)$/i

export default handler

async function doodstreamSearch(query) {
    let res = await fetch(`https://doodapi.com/api/search/videos?key=13527p8pcv54of4yjeryk&search_term=${query}`)
    let result = await res.json()
    return result
}

async function doodstreamInfo(query) {
    let res = await fetch(`https://doodapi.com/api/file/info?key=13527p8pcv54of4yjeryk&file_code=${query}`)
    let result = await res.json()
    return result
}

async function doodstreamFolders(query) {
    let res = await fetch(`https://doodapi.com/api/folder/list?key=38097rkclkbw28lzydh4b&code=${query}`)
    let result = await res.json()
    return result
}

async function doodstreamFiles(query) {
    let res = await fetch(`https://doodapi.com/api/file/list?key=38097rkclkbw28lzydh4b&fld_id=${query}`)
    let result = await res.json()
    return result
}