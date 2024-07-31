const { WAMessageStubType } = (await import('@adiwajshing/baileys')).default
const delay = time => new Promise(res => setTimeout(res, time))

export async function before(m) {
  if (m.fromMe || m.isBaileys) return;

  const edtr = `🧙‍♂️ @${m.sender.split('@')[0]} 🧙‍♂️`;
  const messageType = {
    40: '📞 Kamu telat menerima panggilan suara dan panggilan tersebut telah terlewatkan.',
    41: '📹 Kamu telat menerima panggilan video dan panggilan tersebut telah terlewatkan.',
    45: '📞 Kamu telat menerima panggilan suara grup dan panggilan tersebut telah terlewatkan.',
    46: '📹 Kamu telat menerima panggilan video grup dan panggilan tersebut telah terlewatkan.'
  }[m.messageStubType];

  if (m.messageStubType === (WAMessageStubType.CALL_MISSED_VOICE || WAMessageStubType.CALL_MISSED_VIDEO)) {
    const cap = 'Kamu di banned + block + warn + kick oleh bot karena telah melanggar aturan bot\n\n*📮Dilarang menelepon Bot!*';
    await this.sendMessage(m.chat, { text: `${edtr}\n${messageType}`, mentions: [m.sender] }, { quoted: fliveLocc, ephemeralExpiration: ephemeral });
    await this.reply(m.chat, cap, null);
    await delay(1000);
    global.db.data.users[m.sender].banned = true;
    global.db.data.users[m.sender].warning = 1;
    await this.updateBlockStatus(m.sender, "block");
    if (m.isGroup) {
      await this.groupParticipantsUpdate(m.chat, [m.sender], "remove");
    }
  } else {
    console.log({ messageStubType: m.messageStubType, messageStubParameters: m.messageStubParameters, type: m.messageStubType });
  }
}

export const disabled = false;