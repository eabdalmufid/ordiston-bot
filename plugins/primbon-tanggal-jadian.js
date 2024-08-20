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
} else return m.reply("Masukkan pesan!")
await m.reply(wait)
try {
  const inputText = text.split("|");

  if (inputText.length === 3 && inputText.every(input => input.trim() !== '')) {
    const tanggalJadian = await primbon.tanggal_jadian_pernikahan(
      inputText[0], inputText[1], inputText[2]
    );

    const caption = `
=== Tanggal Jadian/Pernikahan ===
Tanggal: ${tanggalJadian.message.tanggal}
Karakteristik: ${tanggalJadian.message.karakteristik}
Catatan: ${tanggalJadian.message.catatan}
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
handler.help = ["tanggaljadian"]
handler.tags = ["primbon"]
handler.command = /^tanggaljadian$/i
export default handler