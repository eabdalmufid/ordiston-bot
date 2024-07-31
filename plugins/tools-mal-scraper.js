import {
    getInfoFromName
} from "mal-scraper";

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    if (!text) throw "input text"
    try {
        await m.reply(wait)
        const {
            premiered,
            broadcast,
            genres,
            englishTitle,
            japaneseTitle,
            type,
            episodes,
            rating,
            aired,
            score,
            favorites,
            ranked,
            duration,
            studios,
            popularity,
            members,
            scoreStats,
            source,
            synonyms,
            status,
            id,
            picture
        } = await getInfoFromName(text);
        let sym = "  ○"
        const Desc = `      *[ My Anime List ]*

${sym} *Premiered:* ${premiered}
${sym} *Broadcast:* ${broadcast}
${sym} *Genres:* ${genres}
${sym} *English Title:* ${englishTitle}
${sym} *Japanese Title:* ${japaneseTitle}
${sym} *Type:* ${type}
${sym} *Episodes:* ${episodes}
${sym} *Rating:* ${rating}
${sym} *Aired:* ${aired}
${sym} *Score:* ${score}
${sym} *Favorite:* ${favorites}
${sym} *Ranked:* ${ranked}
${sym} *Duration:* ${duration}
${sym} *Studios:* ${studios}
${sym} *Popularity:* ${popularity}
${sym} *Members:* ${members}
${sym} *Score Stats:* ${scoreStats}
${sym} *Source:* ${source}
${sym} *Synonyms:* ${synonyms}
${sym} *Status:* ${status}
${sym} *Identifier:* ${id}
${sym} *Link:* ${id}`;
        await conn.sendFile(m.chat, picture, "", Desc, m);
    } catch (e) {
        throw eror
    }
}
handler.help = ["malscraper query"]
handler.tags = ["internet"]
handler.command = /^(malscraper)$/i

export default handler
