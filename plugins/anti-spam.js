import { performance } from 'perf_hooks';

export async function before(m) {
    const users = global.db.data.users;
    const chats = global.db.data.chats;

    if (!chats[m.chat].antiSpam || m.isBaileys || m.mtype === 'protocolMessage' || m.mtype === 'pollUpdateMessage' || m.mtype === 'reactionMessage') return;
    if (!m.msg || !m.message || m.key.remoteJid !== m.chat || users[m.sender].banned || chats[m.chat].isBanned) return;

    this.spam = this.spam || {};
    this.spam[m.sender] = this.spam[m.sender] || { count: 0, lastspam: 0 };
    const now = performance.now();
    const timeDifference = now - this.spam[m.sender].lastspam;

    if (timeDifference < 10000) {
        this.spam[m.sender].count++;
        if (this.spam[m.sender].count >= 5) {
            users[m.sender].banned = true;
            this.spam[m.sender].lastspam = now + 5000;
            const remainingCooldown = Math.ceil((this.spam[m.sender].lastspam - now) / 1000);
            setTimeout(() => {
                users[m.sender].banned = false;
                this.spam[m.sender].count = 0;
                m.reply(`✅ *Cooldown selesai*\nAnda bisa mengirim pesan lagi.`);
            }, 5000);
            const message = m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) || 'Unknown';
            return m.reply(`❌ *Mohon jangan spam ${message}*\nTunggu setelah ${remainingCooldown} detik`);
        }
    } else {
        this.spam[m.sender].count = 0;
    }

    this.spam[m.sender].lastspam = now;
}