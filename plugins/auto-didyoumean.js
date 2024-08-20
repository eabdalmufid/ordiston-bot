import didyoumean from 'didyoumean'
import similarity from 'similarity'

export async function before(m, {
    match,
    usedPrefix
}) {
    if ((usedPrefix = (match[0] || '')[0])) {
        let noPrefix = m.text.replace(usedPrefix, '')
        let args = noPrefix.trim().split` `.slice(1)
        let help = Object.values(plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
        if (help.includes(noPrefix)) return
        let mean = didyoumean(noPrefix, help)
        if (!mean) return
        let sim = similarity(noPrefix, mean)
        if (sim === 1 || mean.toLowerCase() === noPrefix.toLowerCase()) return
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
        let name = await this.getName(who)
        let emoji = '🤔'
        if (sim >= 0.75) {
            emoji = '😄'
        } else if (sim >= 0.5) {
            emoji = '😅'
        }
        let caption = `👋 Hai ${name.split('\n')[0]} (@${who.split("@")[0].split('\n')[0]})\n\nApakah yang kamu maksud:\n*${usedPrefix + mean}*\n\nSimilarity: *${Number(sim * 100).toFixed(2)}%* ${emoji}`
        await this.sendMessage(m.chat, {
            text: caption,
            mentions: this.parseMention(caption)
        }, {
            quoted: m,
            ephemeralExpiration: ephemeral
        });
    }
}

export const disabled = true