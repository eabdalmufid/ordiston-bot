import {
    wiktionaryEn,
    wiktionaryId
} from '../lib/wiktionary-api.js'
let handler = async (m, {
    text,
    command
}) => {
    if (!text) return m.reply('Input query');
    if (command == "wiktionaryen") {
        const result = await wiktionaryEn(text);
        let message = `*Word:* ${result.word}\n*Language:* ${result.language}\n\n`;
        result.definitions.forEach((definition, index) => {
            message += `*Speech:* ${definition.speech}\n`;
            definition.lines.forEach((line, lineIndex) => {
                message += `  *Define:* ${line.define}\n`;
            });
            message += '\n';
        });
        await m.reply(message);
    }
    if (command == "wiktionaryid") {
        const searchData = await wiktionaryId(text);
        const searchResults = searchData.query.search;
        let message = '';
        searchResults.forEach((result) => {
            message += `*Word:* ${result.title}\n`;
            const snippetLines = result.snippet.split('\n');
            snippetLines.forEach((line) => {
                const cleanedLine = line.replace(/<[^>]*>/g, ''); // Menghapus tag HTML
                if (cleanedLine.trim() !== '') {
                    message += `  *Snippet:* ${cleanedLine}\n`;
                }
            });
            message += '\n';
        });
        await m.reply(message);
    }
};
handler.help = ["wiktionaryen", "wiktionaryid"];
handler.tags = ["internet"];
handler.command = /^(wiktionaryen|wiktionaryid)$/i;
export default handler;