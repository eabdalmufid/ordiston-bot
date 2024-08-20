export async function before(m, { isOwner }) {
    const chat = global.db.data.chats[m.chat];
    if (m.isBaileys || !m.text) return false;
    
    if (chat.gconly && !m.chat.endsWith("g.us") && !isOwner) {
        chat.pconly = false;
        chat.isBanned = true;
        if (m.isCommand || m.text) return m.reply("*Bot dalam mode GC Only*");
    } else {
        chat.isBanned = false;
    }
    
    if (chat.pconly && m.chat.endsWith("g.us") && !isOwner) {
        chat.gconly = false;
        chat.isBanned = true;
        if (m.isCommand || m.text) return m.reply("*Bot dalam mode PC Only*");
    } else {
        chat.isBanned = false;
    }
}

export const disabled = false;