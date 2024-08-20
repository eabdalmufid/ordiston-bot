let handler = async (m, {
    text,
    args,
    groupMetadata,
    command
}) => {
    if (args[0] < 0 || args.length < 2) throw `Example: *.${command}* 15 gay`
    let orang = groupMetadata.participants.map(u => u.id);
    let acakin = orang.sort(() => Math.random() - 0.5).slice(0, args[0]);
    let listnya = acakin.map((v, i) => `${i+1}. @${v.replace(/@s.whatsapp.net/g,'')}`).join("\n");
    let hasil = `*🎉 Kamu Ter${command} sebagai ${text.replace(args, '').trimStart()}*\n\n${listnya}`;
    await conn.reply(m.chat, hasil, m, {
        mentions: conn.parseMention(hasil)
    });
}
handler.help = ["pick <jumlah> <teks>"]
handler.tags = ["fun"]
handler.command = /^pick/i
export default handler