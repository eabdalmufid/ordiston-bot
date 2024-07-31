
import fetch from 'node-fetch'

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    
    await m.reply(wait)
    try {
        const imgx = await Couple();

        if (imgx) {
            const male = imgx.male;
            const female = imgx.female;
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: { url: male },
                caption: `Nih *male* nya\nRequest by: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            });
            await conn.sendMessage(m.chat, {
                image: { url: female },
                caption: `Nih *female* nya\nRequest by: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            });
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["resvcouple"]
handler.tags = ["tools"]
handler.command = /^(resvcouple)$/i
handler.limit = true
export default handler

async function Couple() {
    try {
        const response = await fetch("https://tools.revesery.com/couple/revesery.php");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        throw error; // Rethrow the error to handle it further up the call stack
    }
}