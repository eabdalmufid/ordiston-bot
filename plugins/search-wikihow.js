import {
    wikihowSearch,
    wikihowRead
} from '../lib/wikihow.js';

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (isLink(text)) {
        let res = await wikihowRead(text)
        let txt = ''
        for (let x = 0; x < res.length; x++) {
            txt += `\n*Langkah ${x + 1}*\n`
            txt += `\t${res[x].title}\n`
            txt += `\t\t${res[x].data}\n`
        }
        await m.reply(txt.trim())
    } else if (text) {
        let res = await wikihowSearch(text);
        if (!res.length) throw `Query "${text}" Not Found`;
        let message = `*How-to Instructions You Can Trust.*\n\n`;
        res.forEach((v, index) => {
            message += `*${index + 1}. ${v.title}*\n`;
            message += `Tanggal: ${v.date}\nViews: ${v.view}\n`;
            message += `Link: ${v.link}\n\n`;
        });
        await m.reply(message);
    } else throw 'Input Query'
}
handler.help = ['wikiHow']
handler.tags = ['search']
handler.command = /^(wikihow)$/i
export default handler

function isLink(text) {
    const linkPattern = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
    return linkPattern.test(text);
}