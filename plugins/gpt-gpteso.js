import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("Input query\nExample: .gpteso hello")
await m.reply(wait)
try {
let result = await submitChat(text)
await m.reply(result)
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["gpteso"]
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^(gpteso)$/i
export default handler

/* New Line */
async function submitChat(input) {
    const messages = [{ role: "user", content: input }, { role: "assistant", content: "I'm doing well, thanks!" }];
    const url = "https://onlinegpt.org";
    const data = { botId: "default", customId: null, session: "N/A", chatId: "", contextId: 58, messages, newMessage: messages[messages.length - 1].content, stream: true };
    const response = await fetch(`${url}/wp-json/mwai-ui/v1/chats/submit`, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
    const outs = await response.text();
    const result = outs.split('\n').map(e => { try { return JSON.parse(e.replace('data: ', '')); } catch (error) { return null; } }).find(e => e && e.type === "end");
    return result ? JSON.parse(result.data).reply : null;
}