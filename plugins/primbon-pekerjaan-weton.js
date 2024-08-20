const { Primbon } = await(await import('../lib/scraped-primbon.js'))
const primbon = new Primbon()
let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
let text
if (args.length >= 1) {
  text = args.slice(0).join(" ")
} else if (m.quoted && m.quoted.text) {
  text = m.quoted.text
} else return m.reply("Apa mimpi mu?")
await m.reply(wait)
try {
  const inputText = text.split("|");

  if (inputText.length === 3 && inputText.every(input => input.trim() !== '')) {
    const pekerjaanWeton = await primbon.pekerjaan_weton_lahir(inputText[0], inputText[1], inputText[2]);

    const caption = `
=== Pekerjaan Berdasarkan Weton Lahir ===
Hari Lahir Anda: ${pekerjaanWeton.message.hari_lahir}
Pekerjaan: ${pekerjaanWeton.message.pekerjaan}
Catatan: ${pekerjaanWeton.message.catatan}
`;

    await m.reply(caption);
  } else {
    console.error("Mohon pastikan semua input teks diisi. Total 3 input diperlukan.");
    await m.reply("Mohon pastikan semua input teks diisi. Total 3 input diperlukan.");
  }
} catch (error) {
  console.error("Error occurred during conversion:", error);
  await m.reply("Terjadi kesalahan!");
}

}
handler.help = ["kerjaweton"]
handler.tags = ["primbon"]
handler.command = /^kerjaweton$/i
export default handler